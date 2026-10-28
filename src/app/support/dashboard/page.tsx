import type {Metadata} from 'next';
import SupportOperator from '@/components/SupportOperator';
export const metadata:Metadata={title:'پنل پشتیبانی رادونیک',robots:{index:false,follow:false}};
export default function Page(){return <SupportOperator/>;}