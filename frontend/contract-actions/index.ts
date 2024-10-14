import { ethers } from "ethers";
import { abi } from "./abi";
import type { joinCreatedGroupType } from "@/lib/types";

const contractAddress =
  process.env.CONTRACT_ADDRESS || "0x6216E99E1d39A9723f2756E839051c65d05736d4";

const getProviderAndSigner = async () => {
  if (typeof window === "undefined" || !(window as any).ethereum) {
    throw new MetaMaskNotInstalledError();
  }

  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  return { provider, signer };
};

const createNewMemberWithSigner = async (
  signer: ethers.Signer,
  contractAddress: string,
  abi: any
) => {
  const signerAddress = await signer.getAddress();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const transaction = await contract.createNewMember(signerAddress);
  await transaction.wait();

  const id = await contract.memberCounter();
  const formatted = id.toNumber();

  return [formatted, signerAddress];
};

const subscribePremiumWithSigner = async (
  signer: ethers.Signer,
  contractAddress: string,
  abi: any,
  premiumValue: ethers.BigNumber | number
) => {
  const signerAddress = await signer.getAddress();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const transaction = await contract.subscribePremium({
    value: premiumValue,
  });
  await transaction.wait();

  return [signerAddress, premiumValue];
};

const createNewGroupWithSigner = async (
  signer: ethers.Signer,
  contractAddress: string,
  abi: any,
  collateralValue: string
) => {
  const signerAddress = await signer.getAddress();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const result = valueFormatter(collateralValue);
  if (!result) throw new Error("Error parsing value");

  const [formattedValue, numberFormat] = result;

  const txResponse = await contract.createGroup(formattedValue);
  await txResponse.wait();

  const groupId = await contract.counter();
  const formatted = groupId.toNumber();

  return [formatted, numberFormat as number, signerAddress as string];
};

const joinGroupWithSigner = async (
  signer: ethers.Signer,
  { id, amount, collateralValue, reputationPoint }: joinCreatedGroupType
) => {
  try {
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const result = valueFormatter(amount);
    if (!result) throw new Error("Error parsing value");

    const [formattedValue, numberFormat] = result;
    if (!formattedValue || !numberFormat)
      throw new Error("Error parsing value");

    const formattedCollateralValue = BigInt(collateralValue);

    const txResponse = await contract.joinGroup(
      signerAddress,
      id,
      formattedCollateralValue,
      reputationPoint,
      {
        value: formattedValue,
      }
    );

    await txResponse.wait();
    return `User ${signerAddress} joined group ${id} successfully`;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    throw new JoinGroupError();
  }
};

const startContributionWithSigner = async (
  signer: ethers.Signer,
  contractAddress: string,
  abi: any,
  id: number,
  contributionValue: number
) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const txResponse = await contract.startContribution(id, contributionValue);
    await txResponse.wait();
  } catch (error) {
    console.error(error);
  }
};

const valueFormatter = (value: string) => {
  try {
    const formattedValue = ethers.utils.parseUnits(value, "ether");
    const numberFormat = Number(formattedValue.toString());
    return [formattedValue, numberFormat];
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
};

//creating new member
const createNewMember = async (): Promise<[number, string]> => {
  try {
    const { signer } = await getProviderAndSigner();
    const [formatted, signerAddress] = await createNewMemberWithSigner(
      signer,
      contractAddress,
      abi
    );
    return [formatted, signerAddress];
  } catch (error) {
    if (error instanceof MetaMaskNotInstalledError) {
      throw error;
    }
    console.error(`An error occurred: ${error}`);
    throw new Error("An error occurred while creating a new member");
  }
};

const createNewGroup = async (
  collateralValue: string
): Promise<[number, number, string]> => {
  try {
    const { signer } = await getProviderAndSigner();
    const [formatted, numberFormat, signerAddress] =
      await createNewGroupWithSigner(
        signer,
        contractAddress,
        abi,
        collateralValue
      );

    return [formatted, numberFormat, signerAddress];
  } catch (error) {
    if (error instanceof MetaMaskNotInstalledError) {
      throw error;
    }
    console.error(`An error occurred: ${error}`);
    throw new Error("An error occurred while creating a new group");
  }
};

//join created group
const joinCreatedGroup = async ({
  id,
  amount,
  collateralValue,
  reputationPoint,
}: joinCreatedGroupType) => {
  try {
    const { signer } = await getProviderAndSigner();
    const result = await joinGroupWithSigner(signer, {
      id,
      amount,
      collateralValue,
      reputationPoint,
    });
    return result;
  } catch (error) {
    if (error instanceof MetaMaskNotInstalledError) {
      throw error;
    }
    console.error(`An error occurred: ${error}`);
    throw new Error("An error occurred while joining a group");
  }
};

const subscribePremiumUser = async (): Promise<[string, number]> => {
  try {
    const result = valueFormatter("0.002");

    if (!result) throw new Error("Error parsing value");

    const [formattedValue, numberFormat] = result;
    const { signer } = await getProviderAndSigner();

    const [signerAddress, premiumValue] = await subscribePremiumWithSigner(
      signer,
      contractAddress,
      abi,
      formattedValue
    );

    if (!signerAddress || !premiumValue) throw new Error("Error parsing value");
    return [signerAddress as string, numberFormat as number];
  } catch (error) {
    console.error(error);
    throw new SubscriptionError();
  }
};

const StartContribution = async (id: number, contributionValue: number) => {
  try {
    const { signer } = await getProviderAndSigner();
    await startContributionWithSigner(
      signer,
      contractAddress,
      abi,
      id,
      contributionValue
    );
  } catch (error) {
    console.error(error);
    throw new StartContributionError();
  }
};

export {
  createNewMember,
  createNewGroup,
  getProviderAndSigner,
  joinCreatedGroup,
  valueFormatter,
  subscribePremiumUser,
  StartContribution,
};
