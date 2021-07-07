import { ethers } from 'ethers'
import { ChainId } from '..'
import { NepToken, ProvisionContract } from '../registry'
import { IApproveTransactionArgs } from '../types/IApproveTransactionArgs'
import { IWrappedResult } from '../types/IWrappedResult'
import { Status } from '../types/Status'
import { getApprovalAmount } from '../utils/erc20-utils'

const approve = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const nep = await NepToken.getInstance(chainId, signerOrProvider)
    const amount = getApprovalAmount(args)
    const provision = await ProvisionContract.getInstance(chainId, signerOrProvider)

    const result = await nep.approve(provision.address, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    console.error(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const increase = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const contract = await ProvisionContract.getInstance(chainId, signerOrProvider)
    const result = await contract.increaseProvision(key, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    console.error(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const decrease = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const contract = await ProvisionContract.getInstance(chainId, signerOrProvider)
    const result = await contract.decreaseProvision(key, amount)
    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    console.error(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const get = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<IWrappedResult> => {
  try {
    const contract = await ProvisionContract.getInstance(chainId, signerOrProvider)
    const result = await contract.getProvision(key)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    console.error(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

export {
  get,
  approve,
  increase,
  decrease
}
