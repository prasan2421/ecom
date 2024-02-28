const API_URL = 'https://admin.tedxtrondheim.com/graphql'

async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  // WPGraphQL Plugin must be enabled
  try {
    const res = await fetch(API_URL!, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        query,
        variables,
      }),
    });
  
    const json = await res.json();
  
    if (res.ok) {
      // If the response status is OK (2xx), return the data
      return json.data;
    } else {
      // If the response status is not OK, throw an error with the status and message
      throw new Error(`Server error: ${res.status} - ${res.statusText}`);
    }
  } catch (error) {
    console.error(error);
    // throw new Error('Failed to fetch API');
  }
  
}



export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data.post
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC }, categoryName: "events" }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.posts
}


export async function getAllHappeningData(preview) {
  const data = await fetchAPI(
    `
    query AllHappeningData {
      page(id: "cG9zdDoyNQ==") {
        id
        title
        customHappeningField {
          description
          fieldGroupName
          title
        }
        content
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.page
}

export async function getAllEventsPosts(preview) {
  const data = await fetchAPI(
    `
    query AllEventsPosts {
      events(first: 20, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            id
            title
            customEventsField {
              fieldGroupName
              message
            }
            featuredImage {
              node {
                id
                uri
                sourceUrl
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.events
}
export async function getAllPartnerPosts(preview) {
  const data = await fetchAPI(
    `
    query AllPartnerPosts {
      partners(first: 20, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            id
            title
            customPartnerField {
              fieldGroupName
              message
            }
            featuredImage {
              node {
                id
                uri
                sourceUrl
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.partners
}

export async function getAllHomeData(preview) {
  const data = await fetchAPI(
    `
    query AllHomeData {
      page(id: "cG9zdDoyNw==") {
        id
        customHomeField {
          partners
          title
          attendees
          speakers
          users
        }
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.page
}

export async function getAllGalleryData(preview) {
  const data = await fetchAPI(
    `
    query AllGalleryData {
      page(id: "cG9zdDoyMg==") {
        customGalleryField {
          gallery {
            id
            title
            sourceUrl
          }
        }
        featuredImage {
          node {
            id
            title
            sourceUrl
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.page
}

export async function getAllYtData( apiKey, token,afterDate, beforeDate) {

  const response = await fetch(
    // `https://www.googleapis.com/youtube/v3/search?publishedAfter=${afterDate}&publishedBefore=${beforeDate}&part=snippet&maxResults=20&pageToken=${token==null?'':token}&order=date&q=tedxtrondheim&type=video&key=${apiKey}`
    `https://www.googleapis.com/youtube/v3/search?publishedAfter=${afterDate}&publishedBefore=${beforeDate}&part=snippet&maxResults=6&pageToken=${token==null?'':token}&order=date&q=tedxtrondheim&type=video&key=${apiKey}`

    );
  const videos = await response.json();

  return videos
}

export async function getAllSpeakerPosts(preview) {
  const data = await fetchAPI(
    `
    query AllSpeakerPosts {
      speakers(first: 20, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            id
            title
            customField {
              fieldGroupName
              message
            }
            featuredImage {
              node {
                id
                sourceUrl
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.speakers
}

export async function getAllTeamPosts(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC }, categoryName: "team"}) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.posts
}

export async function getAllStaffPosts(preview) {
  const data = await fetchAPI(
    `
    query AllStaffPosts {
      staffs(first: 30) {
        edges {
          node {
            id
            customStaffField {
              subheader
              title
            }
            date
            title
            featuredImage {
              node {
                title
                sourceUrl
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.staffs
}

export async function getAllAboutPosts(preview) {
  const data = await fetchAPI(
    `
    query AllAboutPosts {
      abouts {
        edges {
          node {
            id
            customAboutField {
              description
              title
            }
            title
            featuredImage {
              node {
                title
                sourceUrl
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.abouts
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ''
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  )

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
}
