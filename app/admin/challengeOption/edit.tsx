import {
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  BooleanInput,
  TextField,
  Edit,
} from "react-admin";

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text" />
        <BooleanInput source="correct" label="Correct option" />
        <ReferenceInput source="challengeId" reference="challenges" />
        <TextField source="imageSrc" label="Image URL" />
        <TextField source="audioSrc" label="Audio URL" />
      </SimpleForm>
    </Edit>
  );
};
