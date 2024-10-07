import { Dictionary } from "@/interfaces/dictionary";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";

export default function Footer({
  dictionary,
  className,
}: {
  dictionary: Dictionary;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-center text-balance text-xs text-muted-foreground max-w-lg mx-auto w-full px-4 flex flex-col gap-4",
        className
      )}
    >
      <p className="text-destructive">{dictionary.disclaimer.full}</p>

      <Link
        href="https://doi.org/10.1001/jama.2024.0179"
        className="hover:underline"
      >
        Schlapbach LJ, Watson RS, Sorce LR, Argent AC, Menon K, Hall MW, et al.
        International Consensus Criteria for Pediatric Sepsis and Septic Shock.
        JAMA. 2024 Feb 27;331(8):665–74.
      </Link>

      <p>
        SepsisCheck ©{" "}
        <Link href="https://tahmidazam.github.io" className="hover:underline">
          Tahmid Azam
        </Link>
        .
      </p>

      <p
        style={{
          textAlign: "inherit",
        }}
      >
        <Dialog>
          <DialogTrigger className="hover:underline">
            {dictionary.links.acknowledgements}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dictionary.links.acknowledgements}</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              {dictionary.acknowledgements}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button>{dictionary.buttons.close}</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {" | "}
        <Link
          href="https://github.com/tahmidazam/sepsischeck/blob/main/LICENSE"
          className="hover:underline"
        >
          {dictionary.links.license}
        </Link>
        {" | "}
        <Dialog>
          <DialogTrigger className="hover:underline">
            {dictionary.links.privacyPolicy}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dictionary.links.privacyPolicy}</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              {dictionary.privacyPolicy}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </p>
    </div>
  );
}
