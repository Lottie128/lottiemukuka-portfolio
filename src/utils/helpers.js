export const extractGoogleDriveId = (url) => {
  if (!url) return null
  
  // Match /d/FILE_ID/ format
  const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (driveMatch) return driveMatch[1]
  
  // Match id=FILE_ID format
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (idMatch) return idMatch[1]
  
  return null
}

export const getGoogleDriveImageUrl = (url) => {
  const fileId = extractGoogleDriveId(url)
  return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : url
}

export const getGoogleDriveVideoUrl = (url) => {
  const fileId = extractGoogleDriveId(url)
  return fileId ? `https://drive.google.com/uc?id=${fileId}` : url
}
