import React from 'react';
import { createInput } from '@gluestack-ui/core/input/creator';
import { View, Pressable, TextInput } from 'react-native';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { withStyleContext, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';
import { PrimitiveIcon, UIIcon } from '@gluestack-ui/core/icon/creator';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';

const SCOPE = 'INPUT';

const UIInput = createInput({
  Root: withStyleContext(View, SCOPE),
  Icon: UIIcon,
  Slot: Pressable,
  Input: TextInput,
});

cssInterop(PrimitiveIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: 'classNameColor',
      stroke: true,
    },
  },
});

const inputStyle = tva({
  base: 'border-background-300 flex-row overflow-hidden content-center items-center data-[hover=true]:border-outline-400 data-[focus=true]:border-primary-700 data-[disabled=true]:opacity-40 data-[disabled=true]:web:cursor-not-allowed',
  variants: {
    size: {
      xl: 'h-12',
      lg: 'h-11',
      md: 'h-10',
      sm: 'h-9',
    },
    variant: {
      underlined: 'rounded-none border-b',
      outline: 'rounded border',
      rounded: 'rounded-full border',
    },
  },
});

const inputIconStyle = tva({
  base: 'justify-center items-center text-typography-400 fill-none',
  parentVariants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
});

const inputSlotStyle = tva({
  base: 'justify-center items-center data-[disabled=true]:opacity-40',
});

const inputFieldStyle = tva({
  base: 'flex-1 text-typography-900 py-0 px-3 placeholder:text-typography-500 h-full web:data-[disabled=true]:cursor-not-allowed ios:leading-[0px]',
  parentVariants: {
    variant: {
      underlined: 'px-0',
      outline: '',
      rounded: 'px-4',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
});

type InputBaseProps = {
  name?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: React.ComponentProps<typeof TextInput>['keyboardType'];
};

type IInputProps = React.ComponentProps<typeof UIInput> &
  VariantProps<typeof inputStyle> &
  InputBaseProps & { className?: string };

const Input = React.forwardRef(function Input(
  { className, variant = 'outline', size = 'md', disabled, ...props }: IInputProps,
  ref
) {
  return (
    <UIInput
      ref={ref}
      {...props}
      disabled={disabled}
      className={inputStyle({ variant, size, class: className })}
      context={{ variant, size }}
      data-disabled={disabled ? 'true' : 'false'}
    />
  );
}) as React.FC<IInputProps>;

type IInputIconProps = React.ComponentProps<typeof UIInput.Icon> &
  VariantProps<typeof inputIconStyle> & { className?: string; height?: number; width?: number };

const InputIcon = React.forwardRef(function InputIcon(
  { className, size, ...props }: IInputIconProps,
  ref
) {
  const { size: parentSize } = useStyleContext(SCOPE);

  return (
    <UIInput.Icon
      ref={ref}
      {...props}
      className={inputIconStyle({
        parentVariants: { size: size ?? parentSize },
        class: className,
      })}
    />
  );
}) as React.FC<IInputIconProps>;

type IInputSlotProps = React.ComponentProps<typeof UIInput.Slot> &
  VariantProps<typeof inputSlotStyle> & { className?: string };

const InputSlot = React.forwardRef(function InputSlot(
  { className, ...props }: IInputSlotProps,
  ref
) {
  return (
    <UIInput.Slot
      ref={ref}
      {...props}
      className={inputSlotStyle({ class: className })}
    />
  );
}) as React.FC<IInputSlotProps>;

type IInputFieldProps = React.ComponentProps<typeof UIInput.Input> &
  VariantProps<typeof inputFieldStyle> &
  InputBaseProps & { className?: string };

const InputField = React.forwardRef(function InputField(
  { className, disabled, ...props }: IInputFieldProps,
  ref
) {
  const { variant: parentVariant, size: parentSize } = useStyleContext(SCOPE);

  return (
    <UIInput.Input
      ref={ref}
      {...props}
      editable={!disabled}
      data-disabled={disabled ? 'true' : 'false'}
      className={inputFieldStyle({
        parentVariants: { variant: parentVariant, size: parentSize },
        class: className,
      })}
    />
  );
}) as React.FC<IInputFieldProps>;

Input.displayName = 'Input';
InputIcon.displayName = 'InputIcon';
InputSlot.displayName = 'InputSlot';
InputField.displayName = 'InputField';

export { Input, InputField, InputIcon, InputSlot };