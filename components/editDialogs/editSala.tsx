import { Sala } from "@/lib/definitions";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function EditSala(props: { data: Sala }) {
  const [salaData, setSalaData] = useState(props.data);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
      </DialogHeader>
    </DialogContent>
  );
}
