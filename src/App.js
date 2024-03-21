import { useForm, Controller } from "react-hook-form";
import "@shopify/polaris/build/esm/styles.css";
import {
  Card,
  Text,
  Button,
  Box,
  TextField,
  Grid,
  Page,
  DataTable,
  BlockStack,
  Icon,
  Select,
  Divider,
} from "@shopify/polaris";
import {
  ArrowLeftIcon,
  DeleteIcon,
  PlusCircleIcon,
  AlertDiamondIcon,
} from "@shopify/polaris-icons";
import "./App.css";

function App() {
  const discountTypeOption = [
    { value: "none", label: "none" },
    { value: "% discount", label: "% discount" },
    { value: "Discount / each", label: "Discount / each" },
  ];

  const options = [
    {
      title: "Single",
      subTitle: "Standard price",
      label: "",
      quantity: 1,
      discount_type: "none",
    },
    {
      title: "Duo",
      subTitle: "Save 10%",
      label: "Popular",
      quantity: 2,
      discount_type: "% discount",
      amount: 10,
    },
  ];

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      campaign: "",
      title: "",
      description: "",
      options,
    },
  });
  const values = watch();

  const onSubmit = handleSubmit(async (body) => {
    window.alert(JSON.stringify(body));
    try {
      const response = await fetch("https://api.example.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  const checkOptions = values.options?.length
    ? values.options.find((option) => !!option.title.trim())
    : null;

  const renderPrev = (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
        paddingBottom: "20px",
      }}
    >
      <Button size='large' icon={ArrowLeftIcon} />
      <Box style={{ marginLeft: "8px" }}>
        <Text>Create volume discount</Text>
      </Box>
    </div>
  );

  const renderGeneral = (
    <Card roundedAbove='sm'>
      <Text as='h2' variant='headingSm'>
        General
      </Text>
      <Controller
        name='campaign'
        control={control}
        render={({ field }) => (
          <TextField
            {...register("campaign", { required: true })}
            {...field}
            label='Campaign'
            placeholder='Volume discount #2'
            autoComplete='off'
            error={
              errors.campaign?.type === "required" && (
                <p role='alert'>Campaign name is required</p>
              )
            }
          />
        )}
      />
      <Controller
        name='title'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Title'
            placeholder='Buy more and save'
            autoComplete='off'
          />
        )}
      />
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Description'
            placeholder='Apply for all products in store'
            autoComplete='off'
          />
        )}
      />
    </Card>
  );

  const renderVolumeDiscountRule = (
    <Card padding={0}>
      <Box style={{ padding: "10px 16px" }}>
        <Text as='h2' variant='headingSm'>
          Volume discount rule
        </Text>
      </Box>
      <div style={{ backgroundColor: "#eee", width: "100%", height: "4px" }} />
      <BlockStack>
        {values.options?.length
          ? values.options.map((option, index) => (
              <Box>
                <Box
                  style={{
                    width: "92px",
                    borderBottomRightRadius: "5px",
                    backgroundColor: "#ef4a2d",
                    color: "white",
                    padding: "5px 5px 5px 5px",
                  }}
                >
                  <Text as='h2' variant='headingSm'>
                    OPTION {index + 1}
                  </Text>
                </Box>
                <Box style={{ padding: "5px 30px 50px" }}>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        const filter = values.options.filter(
                          (item, idx) => idx !== index
                        );
                        setValue("options", filter);
                      }}
                    >
                      <Icon source={DeleteIcon} />
                    </div>
                  </Box>
                  <Grid>
                    <Grid.Cell
                      columnSpan={{ xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}
                    >
                      <Controller
                        name={`options.${index}.title`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Title'
                            autoComplete='off'
                          />
                        )}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}
                    >
                      <Controller
                        name={`options.${index}.subTitle`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Subtitle'
                            autoComplete='off'
                          />
                        )}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}
                    >
                      <Controller
                        name={`options.${index}.label`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Label (optinal)'
                            autoComplete='off'
                          />
                        )}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}
                    >
                      <Controller
                        name={`options.${index}.quantity`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...register(`options.${index}.quantity`, {
                              required: true,
                            })}
                            {...field}
                            type='number'
                            inputMode='numeric'
                            label='Quantity'
                            min={1}
                            autoComplete='off'
                            error={
                              errors?.options?.length &&
                              errors.options[index]?.quantity?.type ===
                                "required" && (
                                <p role='alert'>Quantity is required</p>
                              )
                            }
                          />
                        )}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}
                    >
                      <Controller
                        name={`options.${index}.discount_type`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={discountTypeOption}
                            label='Discount type'
                            onChange={(event) => {
                              setValue(`options.${index}.discount_type`, event);
                            }}
                            autoComplete='off'
                          />
                        )}
                      />
                    </Grid.Cell>
                    {option.discount_type !== "none" ? (
                      <Grid.Cell
                        columnSpan={{ xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}
                      >
                        <Controller
                          name={`options.${index}.amount`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...register(`options.${index}.amount`, {
                                required: true,
                              })}
                              {...field}
                              type='number'
                              inputMode='numeric'
                              min={1}
                              suffix={
                                option.discount_type === "Discount / each"
                                  ? "$"
                                  : "%"
                              }
                              error={
                                errors?.options?.length &&
                                errors.options[index]?.amount?.type ===
                                  "required" && (
                                  <p role='alert'>Amount is required</p>
                                )
                              }
                              label='Amount'
                            />
                          )}
                        />
                      </Grid.Cell>
                    ) : null}
                  </Grid>
                </Box>
                <Divider borderColor='border' />
              </Box>
            ))
          : null}
      </BlockStack>
      <Box
        style={{
          padding: "8px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#ef4a2d",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "3px 5px",
            width: "100%",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            const newItem = {
              title: "",
              subTitle: "",
              label: "",
              quantity:
                (values.options[values.options.length - 1]?.quantity || 0) + 1,
              discount_type: "none",
            };
            setValue("options", [...values.options, { ...newItem }]);
          }}
        >
          <div style={{ marginRight: "2px" }}>
            <Icon source={PlusCircleIcon} />
          </div>
          <Text>Add option</Text>
        </div>
      </Box>
      {checkOptions ? null : (
        <Box
          style={{
            textAlign: "center",
            paddingBottom: "15px",
            fontWeight: 600,
            fontSize: "18px",
            color: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Icon source={AlertDiamondIcon} />
          </div>
          <p role='alert'>At least one title option is required</p>
        </Box>
      )}
    </Card>
  );

  const renderPreview = (
    <Card>
      <Text as='h2' variant='headingSm'>
        Preview
      </Text>
      <Box style={{ margin: "25px 0 15px" }}>
        <Text as='h2' variant='headingMd' alignment='center'>
          Buy more and save
        </Text>
      </Box>
      <Text variant='headingXs' as='span' fontWeight='medium'>
        Apply for all products in store
      </Text>
      <DataTable
        hideScrollIndicator={true}
        columnContentTypes={["text", "text", "numeric", "numeric"]}
        headings={["Title", "Discount Type", "Quantity", "Amount"]}
        rows={values.options.map((item) => {
          const amount =
            item.quantity && item.amount
              ? item.amount +
                " " +
                (item.quantity === "Discount / each" ? "$" : "%")
              : "";
          return [item.title, item.discount_type, item.quantity, amount];
        })}
      />
    </Card>
  );

  const renderButtonSubmit = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <button
        type='submit'
        style={{
          fontWeight: 600,
          color: "white",
          backgroundColor: "#ef4a2d",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 15px",
          border: "none",
          borderRadius: "7px",
          cursor: "pointer",
        }}
      >
        Save
      </button>
    </div>
  );

  return (
    <div className='App'>
      <Page fullWidth>
        <form onSubmit={onSubmit}>
          {renderPrev}
          <Grid xs={12}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Grid columnSpan={{md: 12}}>
                <Grid.Cell
                  columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                >
                  {renderGeneral}
                </Grid.Cell>
                <Grid.Cell
                  columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                >
                  {renderVolumeDiscountRule}
                </Grid.Cell>
              </Grid>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              {renderPreview}
            </Grid.Cell>
          </Grid>
          {renderButtonSubmit}
        </form>
      </Page>
    </div>
  );
}

export default App;
