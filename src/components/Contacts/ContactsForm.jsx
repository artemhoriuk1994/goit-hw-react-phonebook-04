import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Btn from "components/Button/Button";
import PropTypes from 'prop-types';

import styled from '@emotion/styled';


const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.space[4]}px;
  margin-top: ${p => p.theme.space[4]}px;
`
const ErrorStyled = styled.p`
  color: ${p => p.theme.colors.redAccent};
  text-transform: uppercase;
`
const Input = styled.input`
  margin-top: ${p => p.theme.space[2]}px;
  padding: ${p => p.theme.space[3]}px;
  font-size: ${p => p.theme.fontSizes.s};
  border: ${p => p.theme.borders.none};
  outline: none;
  border-radius: ${p => p.theme.radii.sm};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 300ms linear;
:hover,
:focus{
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
`
const schem = yup.object().shape({
    name: yup.string().required(),
    number: yup.string().min(13).max(13).required()
})

export const Forms = ({ onSubmit }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schem)
    });


    const submit = (data) => {
        onSubmit(data)
        reset()
    };
    return (
        <FormStyled onSubmit={handleSubmit(submit)}>
            <label htmlFor='name' >
                Name </label>
            <Input
                type="text"
                name="name"
                {...register('name')}
                placeholder='John Doe'
            />
            <ErrorStyled>{errors.name?.message}</ErrorStyled>
            <label htmlFor='number'>
                Phone  </label>
            <Input
                type="tel"
                name="number"
                {...register('number')}
                placeholder='+380970000000'
            />
            <ErrorStyled>{errors.number?.message}</ErrorStyled>
            <Btn type="submit">Add contact</Btn>
        </FormStyled>
    )
}

Forms.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

