import css from './NoteForm.module.css';

import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import { useId } from 'react';
import { type NewNote, type Note } from '@/types/note';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';

interface NoteFormProps {
  onCancel: () => void;
  setIsModal: (type: boolean) => void;
  setTypeModal: (type: 'form' | 'error' | 'create' | 'delete') => void;
  setMessage: (mes: Note) => void;
}

export default function NoteForm({
  onCancel,
  setIsModal,
  setMessage,
  setTypeModal,
}: NoteFormProps) {
  const id = useId();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: NewNote) => {
      const res = await createNote(data);
      return res;
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel();
      setTypeModal('create');
      setMessage(data);
      setIsModal(true);
    },
  });

  const initVal: NewNote = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  function handleSubmit(values: NewNote, actions: FormikHelpers<NewNote>) {
    createMutation.mutate(values);
    actions.resetForm();
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Min length 3 simbols.')
      .max(50, 'Max length 50 simbols.')
      .required('This field is required'),
    content: Yup.string().max(500, 'Max length 500 simbols.'),
    tag: Yup.string()
      .required('This field is required')
      .oneOf(
        ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'],
        'Invalid tag.'
      ),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initVal}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${id}-title`}>Title</label>
          <Field
            type="text"
            id={`${id}-title`}
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${id}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${id}-content`}
            name="content"
            className={css.textarea}
            rows={8}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${id}-tag`}>Tag</label>
          <Field as="select" id={`${id}-tag`} name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onCancel} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
