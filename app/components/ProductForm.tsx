"use client";
import "react-quill/dist/quill.snow.css";
// styles
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { FormValues, schema } from "../utils/schema";
import { DNDContainer } from "./DragAndDrop/DNDContainer";
const DynamicReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="suspense animate-pulse"></div>,
});
const ProductForm = () => {
  // Simulating getting bulletPoints from Back
  const [bulletPoints, setBulletPoints] = useState([
    {
      id: 1,
      text: "Cool bullet point 1",
    },
    {
      id: 2,
      text: "Cool bullet point 2",
    },
    {
      id: 3,
      text: "Cool bullet point 3",
    },
  ]);

  // State for showing success message on ok submit
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Simulating getting keywords from Back
  const [keywords, setKeywords] = useState([
    { label: "Awesome Keyword 1", value: "Awesome Keyword 1" },
    { label: "Awesome Keyword 2", value: "Awesome Keyword 2" },
    { label: "Awesome Keyword 3", value: "Awesome Keyword 3" },
    { label: "Awesome Keyword 4", value: "Awesome Keyword 4" },
  ]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // react-hook-form logic
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Check if selectedKeywords
      if (selectedKeywords.length) {
        data = { ...data, keywords: selectedKeywords };
      }
      console.log(data);

      // API request for the future
      // const apiResponse = await submitFormData(data);
      // console.log("API Response:", apiResponse);

      // Success message logic
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  // Handle the change of the Quill editor
  const handleQuillChange = (content: string) => {
    setValue("description", content);
  };

  // Handle value of the bulletPoints field in the form
  useEffect(() => {
    setValue("bulletPoints", bulletPoints);
  }, [bulletPoints]);

  return (
    <>
      {isSuccess && (
        <Alert variant="success position-absolute w-100 fixed-top ">
          Completed succesfully!
        </Alert>
      )}
      <Form className="my-5" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-4 text-primary">Product Form</h2>

        {/* TITLE */}
        <Form.Group className="mb-4">
          <Form.Label>Product Title - required</Form.Label>
          <Form.Control
            type="text"
            {...register("title")}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title && errors.title.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* DESCRIPTION */}
        <Form.Group className="mb-4">
          <Form.Label>Product Description</Form.Label>
          <DynamicReactQuill onChange={handleQuillChange} />
        </Form.Group>

        {/* BULLETS */}
        <Form.Group className="mb-4">
          <Form.Label>Product Bullets</Form.Label>
          <DNDContainer
            initialbulletPoints={bulletPoints}
            setBulletPoints={setBulletPoints}
          />
        </Form.Group>

        {/* KEYWORDS */}
        <Form.Group className="mb-4">
          <Form.Label>Product Keywords</Form.Label>
          <CreatableSelect
            instanceId="unique-id"
            placeholder="Choose your keywords"
            isMulti
            options={keywords}
            value={
              selectedKeywords.map((keyword) => ({
                label: keyword,
                value: keyword,
              })) as { label: string; value: string }[]
            }
            onChange={(selectedOptions) =>
              setSelectedKeywords(selectedOptions.map((option) => option.value))
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ProductForm;
