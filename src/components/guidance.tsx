import { ChevronDownIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { Button } from "./ui/button";

const STEPS: string[] = [
  "Obtain IV/IO access",
  "Collect blood culture",
  "Start empiric broad-spectrum antibiotics",
  "Measure lactate",
  "Administer fluid bolus(es) if shock present",
  "Start vasoactive agents if shock persists",
];

const CONTINUOUS_REASSESSMENT_STEPS = [
  "Respiratory support",
  "Assess for Paediatric Acute Respiratory Distress Syndrome",
  "Infectious source control",
  "Fluid and vasoactive titration",
  "Advanced haemodynamic monitoring if shock persists",
  "+/- hydrocortisone for refractory shock (may produce benefit or harm)",
  "Nutritional support",
  "Avoid hypoglycaemia",
  "Antimicrobial stewardship",
  "VA or VV ECLS for refractory shock or oxygenation/ventilation failure (after addressing other causes of shcok and respiratory failure",
];

export default function Guidance() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <p className="font-medium">
          Initial Resuscitation Algorithm for Children
        </p>
        <p className="text-xs text-muted-foreground">
          Adapted from{" "}
          <Link
            className="italic hover:underline"
            href="https://www.sccm.org/SurvivingSepsisCampaign/Guidelines/Pediatric-Patients"
          >
            Surviving Sepsis Campaign
          </Link>
          . Use their{" "}
          <span className="italic">
            Fluid and Vasoactive-Inotrope Management
          </span>{" "}
          algorithm for fluid boluses and vasoactive agents.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {STEPS.map((step, index) => (
          <GuidanceStep number={String(index + 1)} label={step} />
        ))}
      </div>

      <ChevronDownIcon className="w-8 h-8 text-destructive" />

      <GuidanceStep
        number={<ReloadIcon />}
        label="Begin Continuous Reassessment"
      ></GuidanceStep>

      <ul className=" text-sm flex flex-col pl-12 gap-1">
        {CONTINUOUS_REASSESSMENT_STEPS.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
}

function GuidanceStep({
  number,
  label,
  aside,
}: {
  number: ReactNode;
  label: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-row items-center gap-4 font-medium">
      <p className="bg-destructive text-destructive-foreground rounded-full w-8 h-8 flex items-center justify-center">
        {number}
      </p>

      <div className="flex flex-col">
        <p>{label}</p>
        {aside && <p className="text-xs text-muted-foreground">{aside}</p>}
      </div>
    </div>
  );
}
