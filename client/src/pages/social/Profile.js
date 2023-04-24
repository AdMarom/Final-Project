import { QUERY_ME } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_PROFILEPIC } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import auth from "../../utils/auth";
import SocialForm from "./SocialForm";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Actives from "./Actives";

export default function Profile() {
  const [addProfilePic, { error }] = useMutation(ADD_PROFILEPIC);
  const { data } = useQuery(QUERY_ME);

  const currentUser = data?.me || data.user || {};

  //IMAGES
  const [images, setImages] = useState([]);
  const maxNumber = 1000;
  const maxSize = 100000000;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);

    setImages(imageList);
  };

  const handleProfilePic = async (e) => {
    e.preventDefault();

    const imageToUpload = images[0].data_url;

    if (!auth.loggedIn()) {
      return;
    }

    try {
      const { data } = await addProfilePic({
        variables: { profileLink: imageToUpload },
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex w-10 border flex-column">
      <Card
        style={{
          width: "18rem",
        }}
      >
        <Card.Img variant="top" src={currentUser.profilePic} />
        <Card.Body>
          <Card.Title>{currentUser.username}</Card.Title>
          <Card.Body variant="primary">
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              maxFileSize={maxSize}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <Button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Add Profile Pic
                  </Button>
                  <SocialForm />
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={image["data_url"]}
                        alt=""
                        style={{ width: "50%", margin: "auto" }}
                      />
                      <div className="image-item__btn-wrapper">
                        <Button onClick={() => onImageUpdate(index)}>
                          Change
                        </Button>
                        <Button onClick={() => onImageRemove(index)}>
                          Remove
                        </Button>
                        <Button onClick={handleProfilePic}>Submit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </Card.Body>
        </Card.Body>
      </Card>

      <Actives />
    </div>
  );
}
