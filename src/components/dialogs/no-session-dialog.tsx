import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { FormEvent } from "react";

type Props = {
  isOpen: boolean;
  onClose(): void;
  onOpenSession(url?: string): void;
}

const NoSessionDialog = ({ isOpen, onClose, onOpenSession }: Props) => {
  function onSubmit(event: FormEvent) {
    event.preventDefault()

    const values = event.target as unknown as { url: { value: string } }
    const url = values.url?.value

    const urlQuery = url.split('/')[url.split('/').length - 1]

    onOpenSession(urlQuery)
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open ? onClose() : undefined}>
      <DialogContent className="border-none">
        <DialogHeader>
          <DialogTitle>Criar nova sessão?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Button
            className="bg-primary-400 text-black mt-1 w-full"
            onClick={() => onOpenSession()}
          >
            Criar
          </Button>
          <p className="my-4 text-center">ou</p>
          <form onSubmit={onSubmit}>
            <div className="flex space-x-4">
              <Input
                name="url"
                placeholder="Cole o link da sessão"
              />
              <Button className="bg-primary-400 text-black" type="submit">Ir</Button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default NoSessionDialog
