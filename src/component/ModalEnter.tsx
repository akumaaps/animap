import {Modal, Button} from 'react-bootstrap'

import dog from '../resources/dog.png'
import cat from '../resources/cat.png'
import dino from '../resources/dino.png'
import bear from '../resources/bear.png'
import capybara from '../resources/capybara.png'

type ModalProps = {
    show: boolean,
    onHide: unknown;
  }

const ModalEntry = (props: ModalProps) => {
    const animals = [
        {id: 1, animals: cat},
        {id: 2, animals: dog},
        {id: 3, animals: bear},
        {id: 4, animals: capybara},
        {id: 4, animals: dino}
        ];

    return(
        <Modal show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
      </Modal>
    )

  
}

export default ModalEntry; 