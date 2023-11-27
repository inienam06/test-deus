import { Button, Divider, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { Inertia, RequestPayload } from '@inertiajs/inertia';
import moment from 'moment';
import React, { useState } from 'react';

interface IForm {
    name: string
    str: number
}

interface IFormUpdate extends IForm {
    character_id: number
}

export default function Home({ data, errors }: {data: ICharacter[], errors: any}) {

    console.log(errors)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const modalUpdate = useDisclosure()
    const [batchInsert, setBatchInsert] = useState<IForm[]>([
        {
            name: "",
            str: 1
        }
    ])
    const [update, setUpdate] = useState<IFormUpdate|undefined>(undefined)

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const payload = {
            characters: batchInsert
        } as unknown

        Inertia.post('/', payload as RequestPayload, {onError: (errors) => {
            console.error('oke')
        }})
    }

    const handleUpdate = (value: IFormUpdate) => {
        const payload = {
            id: value.character_id,
            name: value.name,
            str: value.str
        } as unknown

        Inertia.put('/', payload as RequestPayload)
    }

    const handleDelete = (data: ICharacter) => {
        if(confirm(`Are you sure want to delete ${data.nama_character}?`)) Inertia.delete(`/${data.character_id}`)
    }
    return (
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-blueGray-700">Characters</h3>
        </div>
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={onOpen}>Add</button>
        </div>
      </div>
    </div>

    <div className="block w-full overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse ">
        <thead>
          <tr>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Character Name
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Strength Power
                        </th>
           <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Created At
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Updated At
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Action
                        </th>
          </tr>
        </thead>

        <tbody>
            {data.length > 0 ? data.map(character => <tr key={character.character_id}>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
              {character.nama_character}
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
            {character.strength_power}
            </td>
            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {moment(character.create).format('DD MMM YYYY')}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {moment(character.update).format('DD MMM YYYY')}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <Button colorScheme='red' size="sm" onClick={() => handleDelete(character)}>Remove</Button>
                <Button colorScheme='blue' size="sm" ml={3} onClick={() => {
                    setUpdate({
                        character_id: character.character_id,
                        name: character.nama_character,
                        str: character.strength_power
                    })
                    modalUpdate.onOpen()
                }}>Update</Button>
            </td>
          </tr>) : <tr><td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700' colSpan={5}>No data available!</td></tr>}
        </tbody>

      </table>
    </div>
  </div>

  <Modal isOpen={isOpen} onClose={onClose} key={'create'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Character</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {batchInsert.map((form, key) => <Form key={key} data={form} onChange={(value: IForm) => {
                setBatchInsert(batchInsert.map((v,k) => {
                    return k == key ? value : v
                }))
            }}
            deletable={key !== 0}
            onDelete={() => setBatchInsert(batchInsert.filter((v,k) => k != key))}
            />)}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => setBatchInsert([...batchInsert, {
                name: "", str: 1
            }])}>
              Add Character
            </Button>
            <Button variant='ghost' onClick={handleSubmit}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={modalUpdate.isOpen} onClose={modalUpdate.onClose} key={'update'}>
        <ModalOverlay />
        {update != undefined && <ModalContent>
          <ModalHeader>Update Character</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Form key={`update-form`} data={update} onChange={(value: IForm) => {
                setUpdate({...value, character_id: update.character_id})
            }}
            deletable={false}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={() => handleUpdate(update)}>Save</Button>
          </ModalFooter>
        </ModalContent>}
      </Modal>
</div>
    );
}

const Form = ({deletable, onDelete, data, onChange}: {
    data: IForm,
    deletable: boolean, 
    onDelete?: () => void,
    onChange: (value: IForm) => void}) => {
    return <div className="flex flex-col gap-[16px]">
        <FormControl>
            <FormLabel>Character Name</FormLabel>
            <Input type="text" value={data.name} onChange={(e) => onChange({...data, name: e.target.value})} max={50} required/>
        </FormControl>

        <FormControl>
            <FormLabel>Strength Power</FormLabel>
            <Input type="text" value={data.str} onChange={(e) => {
                if(!isNaN(Number(e.target.value))) onChange({...data, str: Number(e.target.value)})
            }} required autoFocus/>

            {deletable && <Button colorScheme='red' onClick={onDelete} size="sm" className='mt-[16px]'>Remove</Button>}
            <Divider className='mt-[16px]'/>
        </FormControl>
    </div>
}