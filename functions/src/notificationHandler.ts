import * as admin from 'firebase-admin';
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";

export const noticeNotificationHandlerModule = async function (snapshot: DocumentSnapshot, context: EventContext) {
    console.log(snapshot.data());

    const data = snapshot.data();

    if (data) {
        const description = data["description"];
        const language = data["language"];

        const payload = {
            notification: {
                title: "WFC新着ニュース",
                body: description,
            }
        };

        const options = {
            priority: "high"
        };

        admin.messaging().sendToTopic("notice_" + language, payload, options)
            .then(function(response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function(error) {
                console.log("Error sending message:", error);
            });
    }

    return 0;
};