import { google } from 'googleapis';

const DRIVE_SCOPES = ['https://www.googleapis.com/auth/drive'];

interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
  [key: string]: unknown;
}

function loadCredentials(): ServiceAccountCredentials {
  const encoded = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!encoded) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY belum dikonfigurasi.');
  }
  const json = Buffer.from(encoded, 'base64').toString('utf-8');
  return JSON.parse(json) as ServiceAccountCredentials;
}

let drive: ReturnType<typeof google.drive> | null = null;

function getDrive() {
  if (drive) return drive;
  const credentials = loadCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
    scopes: DRIVE_SCOPES,
  });
  drive = google.drive({ version: 'v3', auth });
  return drive;
}

/**
 * Invites `email` as a viewer on the given Drive file or folder. Grant is
 * per-email (not "anyone with the link"), so it only works while the target
 * account is signed in as that exact email. If `fileOrFolderId` is a folder,
 * the viewer gets access to everything currently inside it (and anything
 * added later), so one grant covers a whole multi-module course.
 */
export async function grantDriveAccess(fileOrFolderId: string, email: string): Promise<void> {
  const client = getDrive();
  await client.permissions.create({
    fileId: fileOrFolderId,
    sendNotificationEmail: true,
    requestBody: {
      type: 'user',
      role: 'reader',
      emailAddress: email,
    },
  });
}

/**
 * Removes `email`'s permission on the given Drive file or folder. Drive's
 * API has no "delete by email" call, so this lists permissions first to
 * find the matching permission ID.
 */
export async function revokeDriveAccess(fileOrFolderId: string, email: string): Promise<void> {
  const client = getDrive();
  const { data } = await client.permissions.list({
    fileId: fileOrFolderId,
    fields: 'permissions(id, emailAddress, type)',
  });

  const match = data.permissions?.find(
    (permission) => permission.type === 'user' && permission.emailAddress?.toLowerCase() === email.toLowerCase()
  );
  if (!match?.id) return;

  await client.permissions.delete({
    fileId: fileOrFolderId,
    permissionId: match.id,
  });
}

/**
 * Sets the "viewers and commenters can't download, print, or copy" toggle
 * (Drive UI: share dialog → gear icon) via API — equivalent to
 * `copyRequiresWriterPermission: true` on the file/folder resource. Run this
 * once per file/folder after upload; it is not part of the per-permission
 * grant/revoke calls above. See setup notes for why this must be set here
 * and can't be done through drive.permissions.*.
 */
export async function disableViewerDownloads(fileOrFolderId: string): Promise<void> {
  const client = getDrive();
  await client.files.update({
    fileId: fileOrFolderId,
    requestBody: {
      copyRequiresWriterPermission: true,
      writersCanShare: false,
    },
  });
}
