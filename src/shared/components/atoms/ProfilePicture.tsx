import { cn } from "@/shared/lib/utils"
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "rounded-full bg-white w-10 h-10 flex items-center justify-center text-2xl capitalize  font-bold",
  {
    variants: {
      variant: {
        default: "bg-white text-primary",
        secondary: "bg-primary text-white",
      },
    },
    defaultVariants: {
      variant: "default"
    },
  }
)

interface ProfilePictureProps {
    name : string,
    variant? : "default" | "secondary"
}

export default function ProfilePicture({name, variant} : ProfilePictureProps) {
    return (
        <div className={cn(buttonVariants({variant}))}>
            {name.charAt(0)}
        </div>
    )
}