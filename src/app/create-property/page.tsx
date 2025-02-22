import CreatePropertyForm from "./components/CreatePropertyForm";

export default function CreateProperty() {
  return (
    <div className="py-6 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Create New Property</h1>
      <CreatePropertyForm />
    </div>
  )
}

