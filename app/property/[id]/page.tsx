// app/property/[id]/page.tsx

type Props = {
  params: { id: string };
};

export default function PropertyPage({ params }: Props) {
  return <div>Property ID: {params.id}</div>;
}
