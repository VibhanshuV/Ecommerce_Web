import { SelectTrigger } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button"


//This component generates an entire form on passing the formComntrols - i.e what will be there in the form

function CommonForm({formControls, formData, setFormData, onSubmit, buttonText}) {

    function renderInputByComponentType(getControlItem) {
        let element = null;
        const value = formData[getControlItem.name] || "";
        switch (getControlItem.componentType) {
            case "input":
              element = (
                <Input
                  name={getControlItem.name}
                  placeholder={getControlItem.placeholder}
                  id={getControlItem.name}
                  type={getControlItem.type}
                  value={value}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [getControlItem.name]: event.target.value,
                    })
                  }
                />
              );
      
              break;
            case "select":
              element = (
                <Select
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      [getControlItem.name]: value,
                    })
                  }
                  value={value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={getControlItem.label} />
                  </SelectTrigger>
                  <SelectContent>
                    {getControlItem.options && getControlItem.options.length > 0
                      ? getControlItem.options.map((optionItem) => (
                          <SelectItem key={optionItem.id} value={optionItem.id}>
                            {optionItem.label}
                          </SelectItem>
                        ))
                      : null}
                  </SelectContent>
                </Select>
              );
      
              break;
            case "textarea":
              element = (
                <Textarea
                  name={getControlItem.name}
                  placeholder={getControlItem.placeholder}
                  id={getControlItem.id}
                  value={value}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [getControlItem.name]: event.target.value,
                    })
                  }
                />
              );
      
              break;
      
            default:
              element = (
                <Input
                  name={getControlItem.name}
                  placeholder={getControlItem.placeholder}
                  id={getControlItem.name}
                  type={getControlItem.type}
                  value={value}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [getControlItem.name]: event.target.value,
                    })
                  }
                />
              );
              break;
          }
        return element;
    }

  return (
    <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
            {
                formControls.map((controlItem) => {
                    return (
                        <div key={controlItem.name} className="grid w-full gap-1.5">
                            <Label className="mb-1">{controlItem.label}</Label>
                            {renderInputByComponentType(controlItem)}
                        </div>
                    )
                })
            }
        </div>
        <Button variant='default' type="submit" className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
    </form>
  )
}

export default CommonForm;