type AssentoProps = {
  codigo: string;
  ocupado: boolean;
};

const Assento = ({ codigo, ocupado }: AssentoProps) => {
  return (
    <div className={ocupado ? "bg-red-400 assento" : "bg-green-400 assento"}>
      <span>{codigo}</span>
    </div>
  );
};

export default Assento;
