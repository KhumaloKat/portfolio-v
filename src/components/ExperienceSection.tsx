import CustomeText from "@/components/ui/CustomeText";
import { experiences } from "@/data/data";

export default function ExperienceSection() {
  return (
    <>
      <div className="w-full flex lg:flex-row items-start justify-center space-x-2.5 mb-10 lg:mb-16 text-center lg:text-left">
        <CustomeText title="My" className="font-medium text-4xl sm:text-5xl lg:text-6xl text-[#344054]" />
        <CustomeText title="Work" className="font-medium text-4xl sm:text-5xl lg:text-6xl text-[#7b7d7a]" />
        <CustomeText title="Experience" className="font-medium text-4xl sm:text-5xl lg:text-6xl text-[#7b7d7a]" />
      </div>

      <div className="w-full lg:hidden">
        {experiences.map((exp) => (
          <div key={exp.company} className="mb-8 last:mb-0">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0 mt-2">
                <div className="w-6 h-6 rounded-full border-2 border-dashed border-[#1D2939] bg-white" />
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full ${exp.dotColor}`} />
              </div>

              <div className="flex-1">
                <CustomeText title={exp.company} className="font-semibold text-[#1D2939] text-[20px] sm:text-[24px] mb-1" />
                <CustomeText title={exp.duration} className="text-[#98A2B3] text-[14px] sm:text-[16px] mb-2" />
                <CustomeText title={exp.role} className="font-semibold text-[#1D2939] text-[18px] sm:text-[20px] mb-2" />
                {exp.desc && (
                  <ul className="mt-2 space-y-1.5">
                    {exp.desc.map((item) => (
                      <li key={item} className="ml-4 list-disc text-[#98A2B3] text-[12px] sm:text-[14px] leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden w-full lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10 lg:items-stretch">
        <div className="flex flex-col justify-between gap-16">
          {experiences.map((exp) => (
            <div key={`company-${exp.company}`} className="flex flex-col gap-[14px]">
              <CustomeText title={exp.company} className="font-semibold text-[#1D2939] text-[32px] xl:text-[40px] leading-tight" />
              <CustomeText title={exp.duration} className="text-2xl text-[#98A2B3]" />
            </div>
          ))}
        </div>

        <div className="relative flex flex-col items-center justify-between py-2">
          <div className="absolute top-6 bottom-6 w-[2px] border-l-2 border-dashed border-[#1D2939]" />
          {experiences.map((exp) => (
            <div key={`dot-${exp.company}`} className="relative flex items-center justify-center w-12 h-12">
              <div className="absolute w-12 h-12 rounded-full border-2 border-dashed border-[#1D2939] bg-white" />
              <div className={`w-9 h-9 rounded-full z-10 ${exp.dotColor}`} />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-16">
          {experiences.map((exp) => (
            <div key={`role-${exp.company}`} className="flex flex-col gap-[14px]">
              <CustomeText title={exp.role} className="font-semibold text-[#1D2939] text-[32px] xl:text-[40px] leading-tight" />
              {exp.desc && (
                <ul className="space-y-2">
                  {exp.desc.map((item) => (
                    <li key={item} className="ml-5 list-disc text-[16px] lg:text-[18px] text-[#98A2B3] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
