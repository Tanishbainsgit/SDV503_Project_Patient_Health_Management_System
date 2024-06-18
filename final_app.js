const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display initial login options
function displayInitialOptions() {
    console.log("Welcome to the Patient Health Record System.");
    console.log("1. Patient");
    console.log("2. Health Professional");
    console.log("3. Exit");

    rl.question("Choose an option: ", function(option) {
        switch(option) {
            case "1":
                patientOptions();
                break;
            case "2":
                healthProfessionalOptions();
                break;
            case "3":
                rl.close();
                break;
            default:
                console.log("Invalid option. Please choose again.");
                displayInitialOptions();
        }
    });
}

// Function to display patient options (login or register)
function patientOptions() {
    console.log("\nPatient Options:");
    console.log("1. Login");
    console.log("2. Register");
    console.log("3. Back");

    rl.question("Choose an option: ", function(option) {
        switch(option) {
            case "1":
                patientLogin();
                break;
            case "2":
                patientRegister();
                break;
            case "3":
                displayInitialOptions();
                break;
            default:
                console.log("Invalid option. Please choose again.");
                patientOptions();
        }
    });
}

// Function to display health professional options (login or register)
function healthProfessionalOptions() {
    console.log("\nHealth Professional Options:");
    console.log("1. Login");
    console.log("2. Register");
    console.log("3. Back");

    rl.question("Choose an option: ", function(option) {
        switch(option) {
            case "1":
                healthProfessionalLogin();
                break;
            case "2":
                healthProfessionalRegister();
                break;
            case "3":
                displayInitialOptions();
                break;
            default:
                console.log("Invalid option. Please choose again.");
                healthProfessionalOptions();
        }
    });
}

// Function to handle patient login
function patientLogin() {
    console.log("\nPatient Login:");
    rl.question("Enter Email: ", function(email) {
        rl.question("Enter Password: ", function(password) {
            // Check if patient exists in patients.json
            const patients = readJSONFile('patients.json');
            const patient = patients.find(p => p.email === email && p.password === password);
            if (patient) {
                console.log(`Patient logged in successfully with ID: ${patient.id}`);
                patientMenu(patient);
            } else {
                console.log("Patient not found or incorrect email/password.");
                patientOptions();
            }
        });
    });
}

// Function to handle patient registration
function patientRegister() {
    console.log("\nPatient Registration:");
    rl.question("Enter First Name: ", function(firstName) {
        rl.question("Enter Last Name: ", function(lastName) {
            rl.question("Enter Email: ", function(email) {
                rl.question("Enter Password: ", function(password) {
                    rl.question("Enter Phone Number: ", function(phone) {
                        rl.question("Enter Date of Birth (YYYY-MM-DD): ", function(dateOfBirth) {
                            rl.question("Enter Gender: ", function(gender) {
                                rl.question("Enter Photo URL: ", function(photo) {
                                    const patients = readJSONFile('patients.json');
                                    const newPatient = {
                                        id: generateUniqueId(),
                                        firstName: firstName,
                                        lastName: lastName,
                                        email: email,
                                        password: password,
                                        phone: phone,
                                        dateOfBirth: dateOfBirth,
                                        gender: gender,
                                        photo: photo,
                                        medicalHistory: [],
                                        appointments: []
                                    };
                                    patients.push(newPatient);
                                    writeJSONFile('patients.json', patients);
                                    console.log(`Patient registered successfully with ID: ${newPatient.id}`);
                                    patientMenu(newPatient);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

// Function to display patient menu options
function patientMenu(patient) {
    console.log("\nPatient Menu:");
    console.log("1. View Profile");
    console.log("2. Add Medical History");
    console.log("3. Add Appointment");
    console.log("4. Exit");

    rl.question("Choose an option: ", function(option) {
        switch(option) {
            case "1":
                viewPatientProfile(patient);
                break;
            case "2":
                addMedicalHistory(patient);
                break;
            case "3":
                addAppointment(patient);
                break;
            case "4":
                rl.close();
                break;
            default:
                console.log("Invalid option. Please choose again.");
                patientMenu(patient);
        }
    });
}

// Function to view patient profile
function viewPatientProfile(patient) {
    console.log("\nPatient Profile:");
    console.log("ID:", patient.id);
    console.log("Name:", patient.firstName, patient.lastName);
    console.log("Date of Birth:", patient.dateOfBirth);
    console.log("Gender:", patient.gender);
    console.log("Contact Info:", {
        email: patient.email,
        phone: patient.phone
    });
    console.log("Medical History:", patient.medicalHistory);
    console.log("Appointments:", patient.appointments);
    patientMenu(patient);
}

// Function to add medical history for patient
function addMedicalHistory(patient) {
    rl.question("Enter Condition: ", function(condition) {
        rl.question("Enter Diagnosis Date (YYYY-MM-DD): ", function(diagnosisDate) {
            rl.question("Enter Treatment: ", function(treatment) {
                patient.medicalHistory.push({ condition, diagnosisDate, treatment });
                console.log("Medical history added successfully.");
                writeJSONFile('patients.json', readJSONFile('patients.json')); // Update JSON file
                patientMenu(patient);
            });
        });
    });
}

// Function to add appointment for patient
function addAppointment(patient) {
    rl.question("Enter Appointment ID: ", function(appointmentId) {
        rl.question("Enter Date (YYYY-MM-DD): ", function(date) {
            rl.question("Enter Doctor: ", function(doctor) {
                rl.question("Enter Reason: ", function(reason) {
                    patient.appointments.push({ appointmentId, date, doctor, reason });
                    console.log("Appointment added successfully.");
                    writeJSONFile('patients.json', readJSONFile('patients.json')); // Update JSON file
                    patientMenu(patient);
                });
            });
        });
    });
}

// Function to handle health professional login
function healthProfessionalLogin() {
    console.log("\nHealth Professional Login:");
    rl.question("Enter Email: ", function(email) {
        rl.question("Enter Password: ", function(password) {
            // Check if health professional exists in healthprofessionals.json
            const healthProfessionals = readJSONFile('healthprofessionals.json');
            const healthProfessional = healthProfessionals.find(hp => hp.email === email && hp.password === password);
            if (healthProfessional) {
                console.log(`Health Professional logged in successfully with ID: ${healthProfessional.id}`);
                healthProfessionalMenu(healthProfessional);
            } else {
                console.log("Health Professional not found or incorrect email/password.");
                healthProfessionalOptions();
            }
        });
    });
}

// Function to handle health professional registration
function healthProfessionalRegister() {
    console.log("\nHealth Professional Registration:");
    rl.question("Enter First Name: ", function(firstName) {
        rl.question("Enter Last Name: ", function(lastName) {
            rl.question("Enter Email: ", function(email) {
                rl.question("Enter Password: ", function(password) {
                    rl.question("Enter Phone Number: ", function(phone) {
                        rl.question("Enter Specialization: ", function(specialization) {
                            const healthProfessionals = readJSONFile('healthprofessionals.json');
                            const newHealthProfessional = {
                                id: generateUniqueId(),
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                password: password,
                                phone: phone,
                                specialization: specialization
                            };
                            healthProfessionals.push(newHealthProfessional);
                            writeJSONFile('healthprofessionals.json', healthProfessionals);
                            console.log(`Health Professional registered successfully with ID: ${newHealthProfessional.id}`);
                            healthProfessionalMenu(newHealthProfessional);
                        });
                    });
                });
            });
        });
    });
}

// Function to handle health professional menu options (continued)
function healthProfessionalMenu(healthProfessional) {
    console.log("\nHealth Professional Menu:");
    console.log("1. View Patient Profile");
    console.log("2. Exit");

    rl.question("Choose an option: ", function(option) {
        switch(option) {
            case "1":
                rl.question("Enter Patient ID to view profile: ", function(patientId) {
                    const patients = readJSONFile('patients.json');
                    const patient = patients.find(p => p.id === patientId);
                    if (patient) {
                        console.log("\nPatient Profile:");
                        console.log("ID:", patient.id);
                        console.log("Name:", patient.firstName, patient.lastName);
                        console.log("Date of Birth:", patient.dateOfBirth);
                        console.log("Gender:", patient.gender);
                        console.log("Contact Info:", {
                            email: patient.email,
                            phone: patient.phone
                        });
                        console.log("Medical History:", patient.medicalHistory);
                        console.log("Appointments:", patient.appointments);
                    } else {
                        console.log("Patient not found.");
                    }
                    healthProfessionalMenu(healthProfessional);
                });
                break;
            case "2":
                rl.close();
                break;
            default:
                console.log("Invalid option. Please choose again.");
                healthProfessionalMenu(healthProfessional);
        }
    });
}

// Function to read data from JSON file
function readJSONFile(filename) {
    try {
        return JSON.parse(fs.readFileSync(filename, 'utf8'));
    } catch (error) {
        // If file doesn't exist, return empty array
        console.log(`Error reading ${filename}:`, error.message);
        return [];
    }
}

// Function to write data to JSON file
function writeJSONFile(filename, data) {
    try {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        console.log(`Data written to ${filename} successfully.`);
    } catch (error) {
        console.log(`Error writing to ${filename}:`, error.message);
    }
}

// Function to generate a unique ID
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9); // Simple unique ID generator
}

// Start the system by displaying initial options
displayInitialOptions();
