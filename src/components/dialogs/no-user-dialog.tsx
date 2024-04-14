import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { FormEvent } from "react";

type Props = {
  isOpen: boolean;
  loading: boolean;
  onClose(): void;
  onCreateUser(name?: string): void;
}

const NoUserDialog = ({ isOpen, onClose, onCreateUser, loading }: Props) => {
  function onSubmit(event: FormEvent) {
    event.preventDefault()

    const values = event.target as unknown as { username: { value: string } }
    const name = values.username?.value

    onCreateUser(name)
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open ? onClose() : undefined}>
      <DialogContent className="border-none">
        <DialogHeader>
          <DialogTitle>Novo por aqui?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form onSubmit={onSubmit} className="space-y-6">
            <Input name="username" placeholder="Qual o seu nome?" />
            <Button
              className="bg-primary-400 text-black mt-1 w-full"
              size="sm"
              type="submit"
              disabled={loading}
            >
              Enviar
            </Button>
          </form>
        </DialogDescription>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NoUserDialog
