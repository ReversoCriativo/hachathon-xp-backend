import { InvestorProfile } from './../constants/investor-profile.enum';

export function getInvestorProfile(scale: number): InvestorProfile {
  return scale <= 49
    ? InvestorProfile.CONSERVATIVE
    : InvestorProfile.AGGRESSIVE;
}
