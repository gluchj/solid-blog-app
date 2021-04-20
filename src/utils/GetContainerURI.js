import { getSolidDataset, getThing, getUrlAll } from '@inrupt/solid-client'
import { useSession } from '@inrupt/solid-ui-react'

/*
 * utility function to access a user's solid profile and
 * determine the URI of the blog.ttl dataset
 */
const GetContainerURI = async () => {
  const session = useSession()
  const profileDataset = await getSolidDataset(session.info.webId, { fetch: session.fetch })
  const profileThing = getThing(profileDataset, session.info.webId)
  const podsUrls = getUrlAll(profileThing, "http://www.w3.org/ns/pim/space#storage")
  const pod = podsUrls[0]
  const containerURI = pod + 'public/blog.ttl'
  return containerURI
}

export default GetContainerURI