const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "chat-image");

    try {
        const response = await fetch(url, {
            method: 'post',
            body: formData
        });

        // Check if the response is ok (status code 2xx)
        if (!response.ok) {
            throw new Error('File upload failed');
        }

        const responseData = await response.json();

        // Ensure that the expected data is available in the response
        if (responseData?.secure_url) {
            return { url: responseData.secure_url }; // Return the URL of the uploaded file
        } else {
            throw new Error('No URL returned from Cloudinary');
        }
    } catch (error) {
        console.error('Upload failed:', error);
        throw new Error('An error occurred while uploading the file');
    }
};

export default uploadFile;
