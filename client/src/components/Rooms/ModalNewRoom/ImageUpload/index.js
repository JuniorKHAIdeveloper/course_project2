import placeholderSvg from "../../../../assets/clean-room.svg";

const ImageUpload = ({image, setImage}) => {

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  return (
    <div style={{flex: 1}}>
      {image ? (
        <div>
          <img
            src={image}
            alt="Preview"
            style={{ width: "400px" }}
          />
        </div>
      ) : (
        <div>
        <img
          src={placeholderSvg}
          alt="Placeholder"
          style={{ width: "400px" }}
        />
       </div>
      )}
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUpload;
