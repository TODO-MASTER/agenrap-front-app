import InitialsAvatar from "@/src/features/customers/components/business-showcase/profile-form/initials-avatar";
import ProfileTabs, { UserProfile } from "@/src/features/customers/components/business-showcase/profile-form/profile-tabs/profile-tabs";
import { Separator } from "@/src/shared/components/ui/separator";

export default function ProfileForm({ user }: { user: UserProfile }) {
  return (
    <div className="min-h-dvh bg-(--agenrap-gray-200) flex items-start justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-2xl flex flex-col gap-6">
 
        {/* Header do perfil */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
          <InitialsAvatar initials={user.initials} />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold font-tree leading-tight">{user.fullName}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
            {!user.phone && (
              <p className="text-xs mt-1 font-tree" style={{ color: 'var(--agenrap-yellow-500)' }}>
                ⚠ Telefone não cadastrado
              </p>
            )}
          </div>
        </div>
 
        <Separator />
 
        <ProfileTabs user={user} />
 
      </div>
    </div>
  )
}