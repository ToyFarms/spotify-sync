import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <>
      <Separator />
      <div className="flex flex-col items-center justify-center m-[1rem] dark:text-gray-400 text-[15px]">
        <p>
          Copyright &copy; 2025{" "}
          <a href="https://github.com/ToyFarms" target="_blank">
            ToyFarm
          </a>
          . All rights reserved.
        </p>
      </div>
    </>
  );
}
