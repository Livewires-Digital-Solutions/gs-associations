import { createClient } from '@/lib/supabase/client';
import { loanPrograms as mockLoanPrograms } from '@/data/mockData';
import type { LoanProgram } from '@/data/mockData';

function rowToLoan(row: any): LoanProgram {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    interestRate: row.interest_rate,
    maxAmount: row.max_amount,
    tenure: row.tenure,
    processingFee: row.processing_fee,
    eligibility: row.eligibility,
    features: row.features ?? [],
    bankName: row.bank_name,
    logo: row.logo ?? '',
    popular: row.popular,
    overview: row.overview ?? undefined,
    benefits: row.benefits ?? undefined,
    documents: row.documents ?? undefined,
    process: row.process ?? undefined,
  };
}

export async function getLoanPrograms(): Promise<LoanProgram[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('loan_programs')
      .select('*')
      .order('popular', { ascending: false })
      .order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return mockLoanPrograms;
    return data.map(rowToLoan);
  } catch {
    return mockLoanPrograms;
  }
}

export async function getLoanProgram(id: string): Promise<LoanProgram | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('loan_programs')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return mockLoanPrograms.find(l => l.id === id) ?? null;
    return rowToLoan(data);
  } catch {
    return mockLoanPrograms.find(l => l.id === id) ?? null;
  }
}

export async function createLoanProgram(loan: Omit<LoanProgram, 'id'>): Promise<LoanProgram> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('loan_programs')
    .insert({
      name: loan.name,
      type: loan.type,
      interest_rate: loan.interestRate,
      max_amount: loan.maxAmount,
      tenure: loan.tenure,
      processing_fee: loan.processingFee,
      eligibility: loan.eligibility,
      features: loan.features,
      bank_name: loan.bankName,
      logo: loan.logo,
      popular: loan.popular,
      overview: loan.overview,
      benefits: loan.benefits,
      documents: loan.documents,
      process: loan.process,
    })
    .select()
    .single();
  if (error) throw error;
  return rowToLoan(data);
}

export async function updateLoanProgram(id: string, updates: Partial<LoanProgram>): Promise<void> {
  const supabase = createClient();
  const row: any = {};
  if (updates.name !== undefined)          row.name            = updates.name;
  if (updates.type !== undefined)          row.type            = updates.type;
  if (updates.interestRate !== undefined)  row.interest_rate   = updates.interestRate;
  if (updates.maxAmount !== undefined)     row.max_amount      = updates.maxAmount;
  if (updates.tenure !== undefined)        row.tenure          = updates.tenure;
  if (updates.processingFee !== undefined) row.processing_fee  = updates.processingFee;
  if (updates.eligibility !== undefined)   row.eligibility     = updates.eligibility;
  if (updates.features !== undefined)      row.features        = updates.features;
  if (updates.bankName !== undefined)      row.bank_name       = updates.bankName;
  if (updates.logo !== undefined)          row.logo            = updates.logo;
  if (updates.popular !== undefined)       row.popular         = updates.popular;
  if (updates.overview !== undefined)      row.overview        = updates.overview;
  if (updates.benefits !== undefined)      row.benefits        = updates.benefits;
  if (updates.documents !== undefined)     row.documents       = updates.documents;
  if (updates.process !== undefined)       row.process         = updates.process;
  const { error } = await supabase.from('loan_programs').update(row).eq('id', id);
  if (error) throw error;
}

export async function deleteLoanProgram(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('loan_programs').delete().eq('id', id);
  if (error) throw error;
}
