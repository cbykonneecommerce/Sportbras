import React, { Fragment, useCallback, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Collapse } from 'react-collapse'

import './index.css'

const CSS_HANDLES = [
  'customCollapsibleContainer',
  'customCollapsibleContainerText',
  'customCollapsibleContaineLabel',
  'customCollapsibleContaineLabelPrefix',
  'customCollapsibleContainerItems',
  'customCollapsibleContainerButtonSubItem',
  'customCollapsibleContainerButton',
  'customCollapsibleContainerItemParent',
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
  const { handles } = useCssHandles(CSS_HANDLES)
  const [openItem, setItemOpen] = useState<string>('')
  const [openSubItem, setSubItemOpen] = useState<string>('')

  const { items } = props

  const handleToggle = useCallback(
    (id: string, level: number) => {
      if (level === 1) {
        if (id === openItem) {
          return setItemOpen('')
        }

        return setItemOpen(id)
      }

      if (id === openSubItem) {
        return setSubItemOpen('')
      }

      return setSubItemOpen(id)
    },
    [setItemOpen, openItem, setSubItemOpen, openSubItem]
  )

  return (
    <div className={handles.customCollapsibleContainer}>
      {items.map(item => (
        <div
          key={item.title}
          className={handles.customCollapsibleContainerItemParent}
        >
          <button
            className={handles.customCollapsibleContainerButton}
            onClick={() => handleToggle(item.title, 1)}
          >
            <span className={handles.customCollapsibleContaineLabel}>
              {item.title}
            </span>
            <span className={handles.customCollapsibleContaineLabelPrefix}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                width="20px"
                height="20px"
                viewBox="0 0 27.000000 22.000000"
                preserveAspectRatio="xMidYMid meet"
                fill="#333"
                color="#333"
              >
                <g
                  transform="translate(0.000000,22.000000) scale(0.100000,-0.100000)"
                  fill="#333"
                  stroke="none"
                >
                  <path d="M76 152 c-8 -13 18 -54 51 -84 18 -17 20 -16 51 24 34 44 37 53 23 63 -5 3 -21 -9 -34 -26 l-25 -32 -29 33 c-20 22 -32 29 -37 22z" />
                </g>
              </svg>
            </span>
          </button>
          <Collapse
            isOpened={openItem === item.title}
            headers="test"
            label="test"
          >
            <div className={handles.customCollapsibleContainerItems}>
              {item.subitems.length ? (
                item.subitems.map(subitem => (
                  <Fragment key={subitem.title}>
                    <button
                      className={
                        handles.customCollapsibleContainerButtonSubItem
                      }
                      onClick={() => handleToggle(subitem.title, 2)}
                    >
                      {subitem.title}
                      <span
                        className={handles.customCollapsibleContaineLabelPrefix}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.0"
                          width="20px"
                          height="20px"
                          viewBox="0 0 27.000000 22.000000"
                          preserveAspectRatio="xMidYMid meet"
                          fill="#333"
                          color="#333"
                        >
                          <g
                            transform="translate(0.000000,22.000000) scale(0.100000,-0.100000)"
                            fill="#333"
                            stroke="none"
                          >
                            <path d="M76 152 c-8 -13 18 -54 51 -84 18 -17 20 -16 51 24 34 44 37 53 23 63 -5 3 -21 -9 -34 -26 l-25 -32 -29 33 c-20 22 -32 29 -37 22z" />
                          </g>
                        </svg>
                      </span>
                    </button>
                    <Collapse isOpened={openSubItem === subitem.title}>
                      <p
                        className={handles.customCollapsibleContainerText}
                        dangerouslySetInnerHTML={{
                          __html: subitem.description,
                        }}
                      />
                    </Collapse>
                  </Fragment>
                ))
              ) : (
                <p
                  className={handles.customCollapsibleContainerText}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
            </div>
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
