import { SimpleForm, Create, TextInput, required } from "react-admin";

export const CourseEdit = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="Id" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
      </SimpleForm>
    </Create>
  );
};
