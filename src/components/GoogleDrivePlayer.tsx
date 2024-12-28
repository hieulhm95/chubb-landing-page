const GoogleDrivePlayer = () => {
  //   const fileId = '1N8AUVjfIxhP_VMXx03QTlTTZL55M32Lg'; // Replace with your file ID
  //   const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const fileUrl =
    'https://drive.google.com/uc?id=1SgGkIj8HQ46RIY8yMMuau1iQvaCY2c9A&export=download';
  return (
    <div>
      <h1>Google Drive Video</h1>
      <video controls width="600">
        <source src={fileUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default GoogleDrivePlayer;
