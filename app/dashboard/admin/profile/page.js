import ProfileForm from "@/components/ProfileForm";

export default function AdminProfile() {
  return (
    <div>
      <h1 className="page-title">My Profile</h1>
      <p className="mb-6 mt-2 text-base-content/70">Update your name, phone number and photo.</p>
      <ProfileForm />
    </div>
  );
}
