import * as admin from 'firebase-admin';
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";

export const noticeNotificationHandlerModule = async function (snapshot: DocumentSnapshot, context: EventContext) {
    console.log(snapshot.data());

    const data = snapshot.data();

    if (data) {
        const description = data["description"];

        const payload = {
            notification: {
                title: "新着のお知らせがあります",
                body: description,
            }
        };

        const options = {
            priority: "high"
        };

        admin.messaging().sendToTopic("notice", payload, options)
            .then(function(response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function(error) {
                console.log("Error sending message:", error);
            });
    }

    return 0;
};