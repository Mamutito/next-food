"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
function ImagePicker({ label, name }) {
  const inputFile = useRef();
  const [imagePicked, setImagePicked] = useState(null);
  const handlePickClick = () => {
    inputFile.current.click();
  };
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImagePicked(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePicked(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {imagePicked ? (
            <Image src={imagePicked} alt="A image picked by the user" fill />
          ) : (
            <p>No image picked yet</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={inputFile}
          onChange={handleImagePreview}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick a image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;
