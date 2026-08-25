import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./MenuSetting.css";

export default function MenuSetting() {
  const [menus, setMenus] = useState([
    {
      id: 1,
      title: "Menu 1",
      subMenus: ["Sub Menu 1", "Sub Menu 2", "Sub Menu 3"],
    },
    {
      id: 2,
      title: "Menu 2",
      subMenus: ["Sub Menu 1", "Sub Menu 2", "Sub Menu 3"],
    },
  ]);

  // ================= MAIN POPUP =================

  const [showPopup, setShowPopup] = useState(false);
  const [menuName, setMenuName] = useState("");

  // ================= SUB MENU POPUP =================

  const [showSubPopup, setShowSubPopup] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [newSubMenu, setNewSubMenu] = useState("");

  // ================= EDIT SUB MENU POPUP =================

  const [editSubPopup, setEditSubPopup] = useState(false);
  const [editMenuId, setEditMenuId] = useState(null);
  const [editSubIndex, setEditSubIndex] = useState(null);
  const [editSubName, setEditSubName] = useState("");

  // ================= EDIT MAIN MENU POPUP =================

  const [editMainMenuPopup, setEditMainMenuPopup] =
    useState(false);

  const [editMainMenuId, setEditMainMenuId] =
    useState(null);

  const [editMainMenuName, setEditMainMenuName] =
    useState("");

  // ================= TEMPLATE STATES =================

  const [templates, setTemplates] = useState([]);

  const [showTemplatePopup, setShowTemplatePopup] =
    useState(false);

  const [templateName, setTemplateName] = useState("");

  const [showMenuPopup, setShowMenuPopup] =
    useState(false);

  const [selectedTemplateId, setSelectedTemplateId] =
    useState(null);


    // ================= EDIT TEMPLATE Setting =================

const [showEditTemplatePopup, setShowEditTemplatePopup] = useState(false);
const [editTemplateId, setEditTemplateId] =  useState(null);
const [editTemplateName, setEditTemplateName] =  useState("");

// ================= DELETE CONFIRM POPUP =================

const [deletePopup, setDeletePopup] = useState(false);
const [deleteAction, setDeleteAction] = useState(() => () => {});

  // ================= ADD MAIN MENU =================

  const handleAddMenu = () => {
    if (!menuName.trim()) return;

    setMenus([
      ...menus,
      {
        id: Date.now(),
        title: menuName,
        subMenus: [],
      },
    ]);

    setMenuName("");
    setShowPopup(false);
  };

  // ================= OPEN EDIT MAIN MENU =================

  const handleEditMainMenu = (menu) => {
    setEditMainMenuId(menu.id);
    setEditMainMenuName(menu.title);
    setEditMainMenuPopup(true);
  };

  // ================= UPDATE MAIN MENU =================

  const handleUpdateMainMenu = () => {
    if (!editMainMenuName.trim()) return;

    setMenus((prevMenus) =>
      prevMenus.map((menu) =>
        menu.id === editMainMenuId
          ? {
              ...menu,
              title: editMainMenuName,
            }
          : menu
      )
    );

    setEditMainMenuPopup(false);
    setEditMainMenuId(null);
    setEditMainMenuName("");
  };

  // ================= OPEN SUB MENU POPUP =================

  const openSubMenuPopup = (id) => {
    setSelectedMenuId(id);
    setNewSubMenu("");
    setShowSubPopup(true);
  };

  // ================= ADD SUB MENU =================

  const handleAddSubMenu = () => {
    if (!newSubMenu.trim()) return;

    const updatedMenus = menus.map((menu) => {
      if (menu.id === selectedMenuId) {
        return {
          ...menu,
          subMenus: [...menu.subMenus, newSubMenu],
        };
      }

      return menu;
    });

    setMenus(updatedMenus);
    setShowSubPopup(false);
  };

  // ================= EDIT SUB MENU =================

  const handleEditSubMenu = (menuId, index, value) => {
    setEditMenuId(menuId);
    setEditSubIndex(index);
    setEditSubName(value);
    setEditSubPopup(true);
  };

  // ================= UPDATE SUB MENU =================

  const handleUpdateSubMenu = () => {
    if (!editSubName.trim()) return;

    setMenus(
      menus.map((menu) => {
        if (menu.id === editMenuId) {
          const updated = [...menu.subMenus];

          updated[editSubIndex] = editSubName;

          return {
            ...menu,
            subMenus: updated,
          };
        }

        return menu;
      })
    );

    setEditSubPopup(false);
  };

  // ================= DELETE SUB MENU =================

  const handleDeleteSubMenu = (menuId, index) => {
    setMenus(
      menus.map((menu) => {
        if (menu.id === menuId) {
          return {
            ...menu,
            subMenus: menu.subMenus.filter(
              (_, i) => i !== index
            ),
          };
        }

        return menu;
      })
    );
  };

  // ================= ADD TEMPLATE Setting=================

  const handleAddTemplate = () => {
    if (!templateName.trim()) return;

    setTemplates([
      ...templates,
      {
        id: Date.now(),
        name: templateName,
        subTemplates: [],
        showMenu: false,
      },
    ]);

    setTemplateName("");
    setShowTemplatePopup(false);
  };

  // ================= DELETE TEMPLATE  Setting=================

  const handleDeleteTemplate = (id) => {
    setTemplates(
      templates.filter((item) => item.id !== id)
    );
  };

  // ================= OPEN MENU LIST =================

  const handleOpenSubMenuList = (id) => {
    setSelectedTemplateId(id);
    setShowMenuPopup(true);
  };

  // ================= ADD SUB TEMPLATE =================

  const handleAddSubTemplate = (
    templateId,
    subName
  ) => {
    setTemplates((prev) =>
      prev.map((item) =>
        item.id === templateId
          ? {
              ...item,
              subTemplates: [
                ...item.subTemplates,
                subName,
              ],
            }
          : item
      )
    );

    setShowMenuPopup(false);
  };

  // ================= OPEN EDIT TEMPLATE SETTING=================

const handleEditTemplate = (template) => {
  setEditTemplateId(template.id);
  setEditTemplateName(template.name);
  setShowEditTemplatePopup(true);
};

// ================= UPDATE TEMPLATE  SETTING=================

const handleUpdateTemplate = () => {
  if (!editTemplateName.trim()) return;

  setTemplates((prev) =>
    prev.map((item) =>
      item.id === editTemplateId
        ? {
            ...item,
            name: editTemplateName,
          }
        : item
    )
  );

  setShowEditTemplatePopup(false);
  setEditTemplateId(null);
  setEditTemplateName("");
};

  // ================= DELETE SUB TEMPLATE setting=================

  const handleDeleteSubTemplate = (
    templateId,
    subIndex
  ) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) => {
        if (template.id === templateId) {
          return {
            ...template,
            subTemplates:
              template.subTemplates.filter(
                (_, index) => index !== subIndex
              ),
          };
        }

        return template;
      })
    );
  };

  // ================= OPEN DELETE POPUP =================

const openDeletePopup = (callback) => {
  setDeleteAction(() => callback);
  setDeletePopup(true);
};

// ================= CONFIRM DELETE =================

const handleConfirmDelete = () => {
  deleteAction();
  setDeletePopup(false);
};

// ================= CANCEL DELETE =================

const handleCancelDelete = () => {
  setDeletePopup(false);
};

  return (
    
    <div className="container-menu-setting">
        
      {/* ================= LEFT SIDE ================= */}

      <div className="sidebar-menu-setting">

        <div className="header-menu-setting">

          <h2>Treatment protocol</h2>

          <button
            className="add-btn-menu-setting"
            onClick={() => setShowPopup(true)}
          >
            + Add
          </button>

        </div>

        {menus.map((menu) => (

          <div
            key={menu.id}
            className="menu-box-menu-setting"
          >

            <div className="menu-title-menu-setting">

              <span>{menu.title}</span>

              <div className="menu-actions-menu-setting">

                {/* EDIT MAIN MENU */}

                <FaEdit
                  className="menu-edit-icon-menu-setting"
                  onClick={() =>
                    handleEditMainMenu(menu)
                  }
                />

                {/* ADD SUB MENU */}

                <FaPlus
                  className="menu-plus-icon-menu-setting"
                  onClick={() =>
                    openSubMenuPopup(menu.id)
                  }
                />

              </div>

            </div>

            <ul className="submenu-list-menu-setting">

              {menu.subMenus.map((sub, index) => (

                <li
                  key={index}
                  className="submenu-item-menu-setting"
                >

                  <span>{sub}</span>

                  <div className="submenu-action-menu-setting">

                    <FaEdit
                      className="submenu-icon-menu-setting"
                      onClick={() =>
                        handleEditSubMenu(
                          menu.id,
                          index,
                          sub
                        )
                      }
                    />

                    <FaTrash
                      className="submenu-icon-menu-setting delete-menu-setting"
                    onClick={() =>
                    openDeletePopup(() =>
                     handleDeleteSubMenu(menu.id, index) )} />
                  </div>

                </li>

              ))}

            </ul>

          </div>

        ))}

      </div>

      {/* ================= ADD MENU POPUP ================= */}

      {showPopup && (

        <div className="popup-overlay-menu-setting">

          <div className="popup-box-menu-setting">

            <h3>Add Menu</h3>

            <input
              className="input-menu-setting"
              placeholder="Add Menu"
              value={menuName}
              onChange={(e) =>
                setMenuName(e.target.value)
              }
            />

            <div className="popup-btn-group-menu-setting">

              <button
                className="cancel-btn-menu-setting"
                onClick={() =>
                  setShowPopup(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-btn-menu-setting"
                onClick={handleAddMenu}
              >
                Add Menu
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================= EDIT MAIN MENU POPUP ================= */}

      {editMainMenuPopup && (

        <div className="popup-overlay-menu-setting">

          <div className="popup-box-menu-setting">

            <h3>Edit Menu</h3>

            <input
              className="input-menu-setting"
              value={editMainMenuName}
              onChange={(e) =>
                setEditMainMenuName(e.target.value)
              }
            />

            <div className="popup-btn-group-menu-setting">

              <button
                className="cancel-btn-menu-setting"
                onClick={() =>
                  setEditMainMenuPopup(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-btn-menu-setting"
                onClick={handleUpdateMainMenu}
              >
                Update
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================= ADD SUB MENU POPUP ================= */}

      {showSubPopup && (

        <div className="popup-overlay-menu-setting">

          <div className="popup-box-menu-setting">

            <h3>Add Sub Menu</h3>

            <input
              className="input-menu-setting"
              placeholder="Enter Sub Menu"
              value={newSubMenu}
              onChange={(e) =>
                setNewSubMenu(e.target.value)
              }
            />

            <div className="popup-btn-group-menu-setting">

              <button
                className="cancel-btn-menu-setting"
                onClick={() =>
                  setShowSubPopup(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-btn-menu-setting"
                onClick={handleAddSubMenu}
              >
                Add
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================= EDIT SUB MENU POPUP ================= */}

      {editSubPopup && (

        <div className="popup-overlay-menu-setting">

          <div className="popup-box-menu-setting">

            <h3>Edit Sub Menu</h3>

            <input
              className="input-menu-setting"
              value={editSubName}
              onChange={(e) =>
                setEditSubName(e.target.value)
              }
            />

            <div className="popup-btn-group-menu-setting">

              <button
                className="cancel-btn-menu-setting"
                onClick={() =>
                  setEditSubPopup(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-btn-menu-setting"
                onClick={handleUpdateSubMenu}
              >
                Update
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================= TEMPLATE SECTION ================= */}

      <div className="template-section-menu-setting">

        <div className="template-header-menu-setting">

          <h2>Template Setting</h2>

          <button
            className="add-btn-menu-setting"
            onClick={() =>
              setShowTemplatePopup(true)
            }
          >
            + Template
          </button>

        </div>

        {templates.map((template) => (

          <div
            key={template.id}
            className="template-card-menu-setting"
          >

            <div className="template-title-menu-setting">

              <span>{template.name}</span>

              <div className="template-icons-menu-setting">


                  <FaEdit
                     className="edit-btn-menu-setting"
                     onClick={() =>   handleEditTemplate(template) }  />


                <FaPlus
                  className="menu-plus-icon-menu-setting"
                  onClick={() =>
                    handleOpenSubMenuList(template.id)} />
                      
                    
                <FaTrash
                  className="delete-btn-menu-setting"
                onClick={() =>
              openDeletePopup(() =>
             handleDeleteTemplate(template.id) )}/>

              </div>

            </div>

            {template.subTemplates.length > 0 && (

              <ul className="template-submenu-menu-setting">

                {template.subTemplates.map(
                  (sub, index) => (

                    <li
                      key={index}
                      className="template-submenu-item-menu-setting"
                    >

                      <span>{sub}</span>

                      <FaTrash
                        className="delete-submenu-btn-menu-setting"
                       onClick={() =>
                         openDeletePopup(() =>
                          handleDeleteSubTemplate(
                            template.id,
                            index) )}

                      />

                    </li>

                  )
                )}

              </ul>

            )}

          </div>

        ))}

      </div>

      {/* =================  Add TEMPLATE POPUP ================= */}

      {showTemplatePopup && (

        <div className="popup-overlay-menu-setting">

          <div className="popup-box-menu-setting">

            <h3>Add Template</h3>

            <input
              className="input-menu-setting"
              placeholder="Add Template"
              value={templateName}
              onChange={(e) =>
                setTemplateName(e.target.value)
              }
            />

            <div className="popup-btn-group-menu-setting">

              <button
                className="cancel-btn-menu-setting"
                onClick={() =>
                  setShowTemplatePopup(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-btn-menu-setting"
                onClick={handleAddTemplate}
              >
                Add
              </button>

            </div>

          </div>

        </div>

      )}
           {/* ================= EDIT TEMPLATE POPUP ================= */}

{showEditTemplatePopup && (

  <div className="popup-overlay-menu-setting">

    <div className="popup-box-menu-setting">

      <h3>Edit Template</h3>

      <input
        className="input-menu-setting"
        value={editTemplateName}
        onChange={(e) =>
          setEditTemplateName(e.target.value)
        }
      />

      <div className="popup-btn-group-menu-setting">

        <button
          className="cancel-btn-menu-setting"
          onClick={() =>
            setShowEditTemplatePopup(false)
          }
        >
          Cancel
        </button>

        <button
          className="save-btn-menu-setting"
          onClick={handleUpdateTemplate}
        >
          Update
        </button>

      </div>

    </div>

  </div>

)}
      {/* ================= SELECT MENU POPUP ================= */}

      {showMenuPopup && (

        <div className="popup-overlay-menu-setting">

          <div className="popup-box-menu-setting">

            <h3>Select Menu / Sub Menu</h3>

            <div className="popup-menu-list-menu-setting">

              {menus.map((menu) => (

                <div key={menu.id}>

                  <div className="popup-menu-heading-menu-setting">
                    {menu.title}
                  </div>

                  {menu.subMenus.map(
                    (sub, index) => (

                      <div
                        key={index}
                        className="popup-submenu-item-menu-setting"
                        onClick={() =>
                          handleAddSubTemplate(
                            selectedTemplateId,
                            sub
                          )
                        }
                      >
                        {sub}
                      </div>

                    )
                  )}

                </div>

              ))}

            </div>

            <div className="popup-btn-group-menu-setting">

              <button
                className="cancel-btn-menu-setting"
                onClick={() =>
                  setShowMenuPopup(false)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

      
      {/* ================= DELETE CONFIRM POPUP ================= */}

{deletePopup && (
  <div className="popup-overlay-menu-setting">

    <div className="delete-popup-menu-setting">

      <h3>Are you sure?</h3>

      <p>Are you sure you want to delete it?</p>

      <div className="delete-popup-btns-menu-setting">

        <button
          className="cancel-btn-menu-setting"
          onClick={handleCancelDelete}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn-menu-setting"
          onClick={handleConfirmDelete}
        >
          Confirm
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}