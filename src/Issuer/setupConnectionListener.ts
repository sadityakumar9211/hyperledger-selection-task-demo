import {
    Agent,
    ConnectionEventTypes,
    ConnectionStateChangedEvent,
    DidExchangeState,
    OutOfBandRecord,
} from "@aries-framework/core";
const fs = require("fs");

//setup connection listener
export const setupConnectionListener = (
    issuer: Agent,
    outOfBandRecord: OutOfBandRecord,
    cb: (...args: any) => Promise<unknown>
) => {
    issuer.events.on<ConnectionStateChangedEvent>(
        ConnectionEventTypes.ConnectionStateChanged,
        async ({ payload }) => {
            if (payload.connectionRecord.outOfBandId !== outOfBandRecord.id)
                return;
            if (payload.connectionRecord.state === DidExchangeState.Completed) {
                // the connection is now ready for usage in other protocols!
                console.log(
                    `Connection for out-of-band id ${outOfBandRecord.id} completed`
                );

                console.log(payload.connectionRecord.id);
                
                const [connection] =
                    await issuer.connections.findAllByOutOfBandId(
                        outOfBandRecord.id
                    );

                console.dir(connection);

                await fs.writeFileSync(
                    "./connection.json",
                    JSON.stringify(connection)
                );
                console.log("Written connection successfully...")

                await cb(payload.connectionRecord.id);
            }
        }
    );
};
