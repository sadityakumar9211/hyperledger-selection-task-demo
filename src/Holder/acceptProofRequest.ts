import { Agent, ProofExchangeRecord } from "@aries-framework/core";

export const acceptProofRequest = async (
    holder: Agent,
    proofRecord: ProofExchangeRecord
) => {
    const requestedCredentials =
        await holder.proofs.autoSelectCredentialsForProofRequest({
            proofRecordId: proofRecord.id,
        });

    await holder.proofs.acceptRequest({
        proofRecordId: proofRecord.id,
        proofFormats: requestedCredentials.proofFormats,
    });
    console.log("Proof Request Accepted...");
};
