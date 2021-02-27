import { getUri, postUri } from '../utils/fetch';
import {IToken} from "../model/Token";
import {IClient} from "../model/Client";

export async function getAllTokens(clientName): Promise<IToken[]> {
  const uri = 'http://abhiskum.usersys.redhat.com:8080/clients/'+clientName+'/tokens';
  return await getUri<IToken[]>(uri);
}

export async function getClientDetails(clientName): Promise<IClient> {
    const uri = 'http://abhiskum.usersys.redhat.com:8080/clients/'+clientName;
    return await getUri<IClient>(uri);
}

export async function generateToken(clientName, payload): Promise<IToken> {
    const uri = 'http://abhiskum.usersys.redhat.com:8080/clients/'+clientName+'/items/'+payload.itemType+'/tokens';
    return await postUri<IToken>(uri, payload);
}

