import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import XRayServices from "@/pages/XRayServices";
import Radiology from "@/pages/Radiology";

const ALLOWED = ["Hip Joint", "Knee Joint", "Ankle Joint", "Chest"];
const FORBIDDEN_BODY_PARTS = [
  "Spine X-Ray",
  "Abdominal X-Ray",
  "Skull X-Ray",
  "Pelvis X-Ray",
  "Full Body X-Ray",
  "Dental X-Ray",
];
const FORBIDDEN_MODALITIES = ["MRI", "CT Scan", "Ultrasound", "ECHO", "TMT", "BMI screening"];

const renderPage = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("X-Ray scope: Hip / Knee / Ankle / Chest only", () => {
  describe("/departments/radiology/x-ray-services (XRayServices)", () => {
    it("service grid shows exactly the 4 approved X-Ray cards", () => {
      const { container } = renderPage(<XRayServices />);
      const headings = Array.from(container.querySelectorAll("h3")).map(
        (h) => h.textContent?.trim() ?? "",
      );
      const xrayCards = headings.filter((t) => /X-Ray/i.test(t));

      expect(xrayCards).toHaveLength(4);
      expect(xrayCards).toEqual(
        expect.arrayContaining([
          "Chest X-Ray",
          "Hip Joint X-Ray",
          "Knee Joint X-Ray",
          "Ankle Joint X-Ray",
        ]),
      );
    });

    it("does not offer other X-Ray body parts as services", () => {
      const { container } = renderPage(<XRayServices />);
      const headings = Array.from(container.querySelectorAll("h3")).map(
        (h) => h.textContent?.trim() ?? "",
      );
      FORBIDDEN_BODY_PARTS.forEach((part) => {
        expect(headings, `Unexpected X-Ray card: ${part}`).not.toContain(part);
      });
    });

    it("does not promote MRI/CT/Ultrasound/ECHO/TMT as offered services", () => {
      const { container } = renderPage(<XRayServices />);
      const headings = Array.from(container.querySelectorAll("h3")).map(
        (h) => h.textContent?.trim() ?? "",
      );
      FORBIDDEN_MODALITIES.forEach((m) => {
        expect(headings, `Unexpected modality card: ${m}`).not.toContain(m);
      });
    });

    it("body copy explicitly states the scope limitation", () => {
      const { container } = renderPage(<XRayServices />);
      const text = container.textContent ?? "";
      ALLOWED.forEach((a) => expect(text).toContain(a));
      // A disclaimer sentence must be present
      expect(text).toMatch(
        /(only|limited).{0,80}(Hip.*Knee.*Ankle.*Chest|Chest.*Hip.*Knee.*Ankle)/is,
      );
    });
  });

  describe("/departments/radiology (Radiology)", () => {
    it("mentions all 4 allowed X-Ray areas", () => {
      const { container } = renderPage(<Radiology />);
      const text = container.textContent ?? "";
      ALLOWED.forEach((a) =>
        expect(text, `Radiology page missing: ${a}`).toContain(a),
      );
    });

    it("explicitly disclaims MRI, CT, ultrasound, ECHO and TMT", () => {
      const { container } = renderPage(<Radiology />);
      const text = (container.textContent ?? "").toLowerCase();
      // Must contain a "do not offer" style disclaimer covering these
      expect(text).toMatch(/do not (currently )?offer/);
      ["mri", "ct", "ultrasound", "echo", "tmt"].forEach((m) => {
        expect(text, `Radiology disclaimer missing modality: ${m}`).toContain(m);
      });
    });

    it("does not list any X-Ray service card for non-approved body parts", () => {
      const { container } = renderPage(<Radiology />);
      const cardText = Array.from(container.querySelectorAll("h3, h4"))
        .map((h) => h.textContent ?? "")
        .join(" | ");
      FORBIDDEN_BODY_PARTS.forEach((part) => {
        expect(cardText).not.toContain(part);
      });
    });
  });
});
