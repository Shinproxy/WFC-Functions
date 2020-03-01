import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {noticeNotificationHandlerModule} from "./notificationHandler"

admin.initializeApp();

export const postNotificationHandler = functions.firestore.document("/notice/{noticeId}")
    .onCreate(async (snapshot, context) => {
        await noticeNotificationHandlerModule(snapshot, context);
    });