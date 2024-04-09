import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";

type Props = {
  isOpen: boolean;
  onClose(): void;
}

const SessionDialog = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open ? onClose() : undefined}>
      <DialogContent className="border-none">
        <DialogHeader>
          <DialogTitle>Novo usuário</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Input placeholder="Qual o seu nome?" />
        </DialogDescription>
        <DialogFooter>
          <Button className="bg-primary-400 text-black mt-1">Enviar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SessionDialog
