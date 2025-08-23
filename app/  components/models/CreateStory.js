import React, { useState } from "react";
import { Modal, Typography, TextField, Button } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  backgroundColor: 'var(--background)',
  border: '2px solid var(--primary-color)',
  borderRadius: '10px',
  boxShadow: 24,
  padding: "30px 20px",
  display: "flex",
  fontFamily: "var(--font-cairo)",
}

const CreateStory = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [surce, setSurce] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storyData = image 
            ? { title, content, image, surce }
            : { title, content, surce };
    const success = await onSubmit(storyData)
    if(success){
      setTitle("");
      setContent("");
      setSurce("")
      setImage(null);

    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-story-title"
      aria-describedby="modal-story-description"
    >
      <form
        onSubmit={handleSubmit}
        style={{ ...style, fontFamily: "var(--font-body)" }}
        className="!flex-col items-center justify-center gap-4 w-[30vw] max-lg:w-[40vw] max-md:w-[60vw] max-sm:!w-[90vw]"
      >
        <Typography
          id="modal-story-title"
          variant="h6"
          component="h2"
          className="!text-right !font-[var(--font-body)]"
        >
          إنشاء قصة جديدة
        </Typography>
        <TextField
          id="story-title"
          label="عنوان القصة"
          required
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="!text-right !font-[var(--font-body)]"
          fullWidth
        />
        <TextField
          id="story-content"
          label="محتوى القصة"
          required
          variant="outlined"
          multiline
          minRows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="!text-right !font-[var(--font-body)]"
          fullWidth
        />
        <TextField
          id="story-content"
          label="مصدر القصة"
          required
          variant="outlined"
          multiline
          value={surce}
          onChange={(e) => setSurce(e.target.value)}
          className="!text-right !font-[var(--font-body)]"
          fullWidth
        />
        <TextField
          id="story-image"
          label="صورة (اختياري)"
          type="file"
          inputProps={{ accept: "image/*" }}
          onChange={(e) => setImage(e.target.files[0])}
          className="!text-right !font-[var(--font-body)]"
          fullWidth
        />
        <Button
          type="submit"
          className="btn !py-3 !px-4 !mt-2 !text-lg"
        >
          إنشاء القصة
        </Button>
      </form>
    </Modal>
  );
};

export default CreateStory;