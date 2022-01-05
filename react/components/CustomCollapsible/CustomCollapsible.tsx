import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Collapse } from 'react-collapse'

import './index.css'

const CSS_HANDLES = [
  'customCollapsibleContainer',
  'customCollapsibleContainerText',
]

interface CustomCollapsibleProps {
  items: CustomCollapsibleItem[]
}

interface CustomCollapsibleItem {
  title: string
  description: string
  subitems: CustomCollapsibleSubitem[]
}

interface CustomCollapsibleSubitem {
  title: string
  description: string
}

const CustomCollapsible: StorefrontComponent<CustomCollapsibleProps> = (
  props: CustomCollapsibleProps
) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [openItem, setItemOpen] = useState<string>('')
  const [openSubItem, setSubItemOpen] = useState<string>('')

  const { items } = props

  return (
    <div className={handles.customCollapsibleContainer}>
      <h1>test</h1>
      {items.map(item => (
        <div key={item.title}>
          <button onClick={() => setItemOpen(item.title)}>open</button>
          <Collapse
            isOpened={openItem === item.title}
            headers="test"
            label="test"
          >
            {item.title}
            {item.subitems.length ? (
              item.subitems.map(subitem => (
                <div key={subitem.title}>
                  <button onClick={() => setSubItemOpen(subitem.title)}>
                    open
                  </button>
                  <Collapse isOpened={openSubItem === subitem.title}>
                    {subitem.title}
                    <p className={handles.customCollapsibleContainerText}>
                      {subitem.description}
                    </p>
                  </Collapse>
                </div>
              ))
            ) : (
              <p className={handles.customCollapsibleContainerText}>
                {item.description}
              </p>
            )}
          </Collapse>
        </div>
      ))}
    </div>
  )
}

CustomCollapsible.schema = {
  title: 'Adicionar Accordion dinamico',
  description: 'Adiciona Accordions customizados',
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: {
            title: 'Titulo do Link',
            description: 'Titulo do topo dos links',
            type: 'string',
            default: null,
          },
          image: {
            title: 'imagem',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          link: {
            title: 'Url',
            description: 'URL do item',
            type: 'string',
            default: null,
          },
          maxWidth: {
            title: 'Largura maxima',
            type: 'number',
            default: 300,
          },
        },
      },
    },
  },
}

export default CustomCollapsible
