import { Section, SelectType } from "./style";

export default function Select({name, options, select, setSelect}){
  return(
    <SelectType>
      <label htmlFor="type">Selecione o {name}</label>
      <Section>
        <select
          id="bank"
          name="bank"
          value={select}
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value="">Selecione</option>
          {options.map((e) => (
            <option key={e.name} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      </Section>
    </SelectType>
  )
}