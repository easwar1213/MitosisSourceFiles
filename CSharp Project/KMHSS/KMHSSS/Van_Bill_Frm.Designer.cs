namespace KMHSSS
{
    partial class Van_Bill_Frm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.Trip_Txt = new System.Windows.Forms.TextBox();
            this.Month_CBox = new System.Windows.Forms.ComboBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.Trip_Amt_Txt = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.Place_Txt = new System.Windows.Forms.TextBox();
            this.label11 = new System.Windows.Forms.Label();
            this.VBill_Date_Dtp = new System.Windows.Forms.DateTimePicker();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.SMonth_Txt = new System.Windows.Forms.TextBox();
            this.label12 = new System.Windows.Forms.Label();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.label13 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.Sec_CBox = new System.Windows.Forms.ComboBox();
            this.label6 = new System.Windows.Forms.Label();
            this.Student_Name_CBox = new System.Windows.Forms.ComboBox();
            this.Admis_No_Txt = new System.Windows.Forms.TextBox();
            this.label10 = new System.Windows.Forms.Label();
            this.label14 = new System.Windows.Forms.Label();
            this.VBill_No_Txt = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.Van_Bill_Master_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.label9 = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox5 = new System.Windows.Forms.GroupBox();
            this.Close_Btn = new System.Windows.Forms.Button();
            this.RePrint_Btn = new System.Windows.Forms.Button();
            this.Clear_Btn = new System.Windows.Forms.Button();
            this.Print_Btn = new System.Windows.Forms.Button();
            this.Total_Txt = new System.Windows.Forms.TextBox();
            this.label8 = new System.Windows.Forms.Label();
            this.EMonth_Txt = new System.Windows.Forms.TextBox();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.groupBox4.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.Van_Bill_Master_dataGridView1)).BeginInit();
            this.groupBox1.SuspendLayout();
            this.groupBox5.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.Trip_Txt);
            this.groupBox2.Controls.Add(this.Month_CBox);
            this.groupBox2.Controls.Add(this.label1);
            this.groupBox2.Controls.Add(this.label7);
            this.groupBox2.Controls.Add(this.Trip_Amt_Txt);
            this.groupBox2.Controls.Add(this.label4);
            this.groupBox2.Controls.Add(this.Place_Txt);
            this.groupBox2.Controls.Add(this.label11);
            this.groupBox2.Location = new System.Drawing.Point(34, 213);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(669, 104);
            this.groupBox2.TabIndex = 206;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Fees Details";
            // 
            // Trip_Txt
            // 
            this.Trip_Txt.Enabled = false;
            this.Trip_Txt.Location = new System.Drawing.Point(140, 67);
            this.Trip_Txt.Margin = new System.Windows.Forms.Padding(4);
            this.Trip_Txt.Name = "Trip_Txt";
            this.Trip_Txt.Size = new System.Drawing.Size(176, 28);
            this.Trip_Txt.TabIndex = 12;
            this.Trip_Txt.TextChanged += new System.EventHandler(this.Trip_Txt_TextChanged);
            // 
            // Month_CBox
            // 
            this.Month_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Month_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Month_CBox.FormattingEnabled = true;
            this.Month_CBox.Location = new System.Drawing.Point(140, 21);
            this.Month_CBox.Name = "Month_CBox";
            this.Month_CBox.Size = new System.Drawing.Size(176, 29);
            this.Month_CBox.TabIndex = 10;
            this.Month_CBox.SelectedIndexChanged += new System.EventHandler(this.Month_CBox_SelectedIndexChanged);
            this.Month_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Month_CBox_KeyDown);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(34, 24);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(55, 21);
            this.label1.TabIndex = 60;
            this.label1.Text = "Month";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(34, 70);
            this.label7.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(39, 21);
            this.label7.TabIndex = 58;
            this.label7.Text = "Trip";
            // 
            // Trip_Amt_Txt
            // 
            this.Trip_Amt_Txt.Enabled = false;
            this.Trip_Amt_Txt.Location = new System.Drawing.Point(457, 64);
            this.Trip_Amt_Txt.Margin = new System.Windows.Forms.Padding(4);
            this.Trip_Amt_Txt.Name = "Trip_Amt_Txt";
            this.Trip_Amt_Txt.Size = new System.Drawing.Size(174, 28);
            this.Trip_Amt_Txt.TabIndex = 13;
            this.Trip_Amt_Txt.Text = "0";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(346, 67);
            this.label4.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(64, 21);
            this.label4.TabIndex = 56;
            this.label4.Text = "Amount";
            // 
            // Place_Txt
            // 
            this.Place_Txt.Enabled = false;
            this.Place_Txt.Location = new System.Drawing.Point(457, 22);
            this.Place_Txt.Margin = new System.Windows.Forms.Padding(4);
            this.Place_Txt.Name = "Place_Txt";
            this.Place_Txt.Size = new System.Drawing.Size(174, 28);
            this.Place_Txt.TabIndex = 11;
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Location = new System.Drawing.Point(350, 25);
            this.label11.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(46, 21);
            this.label11.TabIndex = 54;
            this.label11.Text = "Place";
            // 
            // VBill_Date_Dtp
            // 
            this.VBill_Date_Dtp.CustomFormat = "";
            this.VBill_Date_Dtp.Enabled = false;
            this.VBill_Date_Dtp.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.VBill_Date_Dtp.Location = new System.Drawing.Point(450, 22);
            this.VBill_Date_Dtp.Name = "VBill_Date_Dtp";
            this.VBill_Date_Dtp.Size = new System.Drawing.Size(177, 28);
            this.VBill_Date_Dtp.TabIndex = 2;
            this.VBill_Date_Dtp.Value = new System.DateTime(2014, 5, 24, 0, 0, 0, 0);
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.EMonth_Txt);
            this.groupBox3.Controls.Add(this.EYear_Txt);
            this.groupBox3.Controls.Add(this.SMonth_Txt);
            this.groupBox3.Controls.Add(this.label12);
            this.groupBox3.Controls.Add(this.SYear_CBox);
            this.groupBox3.Controls.Add(this.Class_CBox);
            this.groupBox3.Controls.Add(this.label13);
            this.groupBox3.Controls.Add(this.label5);
            this.groupBox3.Controls.Add(this.Sec_CBox);
            this.groupBox3.Controls.Add(this.label6);
            this.groupBox3.Controls.Add(this.VBill_Date_Dtp);
            this.groupBox3.Controls.Add(this.Student_Name_CBox);
            this.groupBox3.Controls.Add(this.Admis_No_Txt);
            this.groupBox3.Controls.Add(this.label10);
            this.groupBox3.Controls.Add(this.label14);
            this.groupBox3.Controls.Add(this.VBill_No_Txt);
            this.groupBox3.Controls.Add(this.label2);
            this.groupBox3.Controls.Add(this.label3);
            this.groupBox3.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox3.Location = new System.Drawing.Point(31, 22);
            this.groupBox3.Margin = new System.Windows.Forms.Padding(4);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Padding = new System.Windows.Forms.Padding(4);
            this.groupBox3.Size = new System.Drawing.Size(672, 184);
            this.groupBox3.TabIndex = 14;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Student Details";
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(230, 64);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(86, 28);
            this.EYear_Txt.TabIndex = 4;
            // 
            // SMonth_Txt
            // 
            this.SMonth_Txt.Enabled = false;
            this.SMonth_Txt.Location = new System.Drawing.Point(451, 148);
            this.SMonth_Txt.Margin = new System.Windows.Forms.Padding(4);
            this.SMonth_Txt.Name = "SMonth_Txt";
            this.SMonth_Txt.Size = new System.Drawing.Size(176, 28);
            this.SMonth_Txt.TabIndex = 9;
            this.SMonth_Txt.TextChanged += new System.EventHandler(this.SMonth_Txt_TextChanged);
            // 
            // label12
            // 
            this.label12.AutoSize = true;
            this.label12.Location = new System.Drawing.Point(346, 151);
            this.label12.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(65, 21);
            this.label12.TabIndex = 239;
            this.label12.Text = "SMonth";
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(138, 63);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(86, 29);
            this.SYear_CBox.TabIndex = 3;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            this.SYear_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.SYear_CBox_KeyDown);
            // 
            // Class_CBox
            // 
            this.Class_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Class_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Class_CBox.FormattingEnabled = true;
            this.Class_CBox.Location = new System.Drawing.Point(450, 65);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(178, 29);
            this.Class_CBox.TabIndex = 5;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            this.Class_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Class_CBox_KeyDown);
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(345, 67);
            this.label13.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(45, 21);
            this.label13.TabIndex = 213;
            this.label13.Text = "Class";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(29, 66);
            this.label5.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(54, 21);
            this.label5.TabIndex = 232;
            this.label5.Text = "AYear";
            // 
            // Sec_CBox
            // 
            this.Sec_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Sec_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Sec_CBox.FormattingEnabled = true;
            this.Sec_CBox.Location = new System.Drawing.Point(138, 105);
            this.Sec_CBox.Name = "Sec_CBox";
            this.Sec_CBox.Size = new System.Drawing.Size(179, 29);
            this.Sec_CBox.TabIndex = 6;
            this.Sec_CBox.SelectedIndexChanged += new System.EventHandler(this.Sec_CBox_SelectedIndexChanged);
            this.Sec_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Sec_CBox_KeyDown);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(31, 106);
            this.label6.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(63, 21);
            this.label6.TabIndex = 220;
            this.label6.Text = "Section";
            // 
            // Student_Name_CBox
            // 
            this.Student_Name_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Student_Name_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Student_Name_CBox.FormattingEnabled = true;
            this.Student_Name_CBox.Location = new System.Drawing.Point(451, 106);
            this.Student_Name_CBox.Name = "Student_Name_CBox";
            this.Student_Name_CBox.Size = new System.Drawing.Size(178, 29);
            this.Student_Name_CBox.TabIndex = 7;
            this.Student_Name_CBox.SelectedIndexChanged += new System.EventHandler(this.Student_Name_CBox_SelectedIndexChanged);
            this.Student_Name_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Student_Name_CBox_KeyDown);
            // 
            // Admis_No_Txt
            // 
            this.Admis_No_Txt.Enabled = false;
            this.Admis_No_Txt.Location = new System.Drawing.Point(139, 148);
            this.Admis_No_Txt.Margin = new System.Windows.Forms.Padding(4);
            this.Admis_No_Txt.Name = "Admis_No_Txt";
            this.Admis_No_Txt.Size = new System.Drawing.Size(177, 28);
            this.Admis_No_Txt.TabIndex = 8;
            this.Admis_No_Txt.TextChanged += new System.EventHandler(this.Admis_No_Txt_TextChanged);
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(31, 149);
            this.label10.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(80, 21);
            this.label10.TabIndex = 216;
            this.label10.Text = "Admis No";
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.Location = new System.Drawing.Point(345, 107);
            this.label14.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(83, 21);
            this.label14.TabIndex = 214;
            this.label14.Text = "Std Name";
            // 
            // VBill_No_Txt
            // 
            this.VBill_No_Txt.Enabled = false;
            this.VBill_No_Txt.Location = new System.Drawing.Point(138, 23);
            this.VBill_No_Txt.Margin = new System.Windows.Forms.Padding(4);
            this.VBill_No_Txt.MaxLength = 10;
            this.VBill_No_Txt.Name = "VBill_No_Txt";
            this.VBill_No_Txt.Size = new System.Drawing.Size(179, 28);
            this.VBill_No_Txt.TabIndex = 1;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(33, 25);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(58, 21);
            this.label2.TabIndex = 209;
            this.label2.Text = "Bill No";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(346, 26);
            this.label3.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(44, 21);
            this.label3.TabIndex = 208;
            this.label3.Text = "Date";
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.Van_Bill_Master_dataGridView1);
            this.groupBox4.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox4.Location = new System.Drawing.Point(30, 432);
            this.groupBox4.Margin = new System.Windows.Forms.Padding(4);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Padding = new System.Windows.Forms.Padding(4);
            this.groupBox4.Size = new System.Drawing.Size(897, 194);
            this.groupBox4.TabIndex = 222;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "View";
            // 
            // Van_Bill_Master_dataGridView1
            // 
            this.Van_Bill_Master_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Van_Bill_Master_dataGridView1.Location = new System.Drawing.Point(22, 27);
            this.Van_Bill_Master_dataGridView1.Margin = new System.Windows.Forms.Padding(4);
            this.Van_Bill_Master_dataGridView1.Name = "Van_Bill_Master_dataGridView1";
            this.Van_Bill_Master_dataGridView1.Size = new System.Drawing.Size(846, 146);
            this.Van_Bill_Master_dataGridView1.TabIndex = 0;
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(377, 9);
            this.label9.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(153, 27);
            this.label9.TabIndex = 221;
            this.label9.Text = "Van Bill Details";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.groupBox5);
            this.groupBox1.Controls.Add(this.Total_Txt);
            this.groupBox1.Controls.Add(this.label8);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(31, 39);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.groupBox1.Size = new System.Drawing.Size(895, 385);
            this.groupBox1.TabIndex = 220;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Van Bill Details";
            // 
            // groupBox5
            // 
            this.groupBox5.Controls.Add(this.Close_Btn);
            this.groupBox5.Controls.Add(this.RePrint_Btn);
            this.groupBox5.Controls.Add(this.Clear_Btn);
            this.groupBox5.Controls.Add(this.Print_Btn);
            this.groupBox5.Location = new System.Drawing.Point(721, 21);
            this.groupBox5.Margin = new System.Windows.Forms.Padding(4);
            this.groupBox5.Name = "groupBox5";
            this.groupBox5.Padding = new System.Windows.Forms.Padding(4);
            this.groupBox5.Size = new System.Drawing.Size(147, 346);
            this.groupBox5.TabIndex = 214;
            this.groupBox5.TabStop = false;
            this.groupBox5.Text = "Operations";
            // 
            // Close_Btn
            // 
            this.Close_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Close_Btn.Location = new System.Drawing.Point(24, 264);
            this.Close_Btn.Margin = new System.Windows.Forms.Padding(4);
            this.Close_Btn.Name = "Close_Btn";
            this.Close_Btn.Size = new System.Drawing.Size(95, 62);
            this.Close_Btn.TabIndex = 229;
            this.Close_Btn.Text = "Close";
            this.Close_Btn.UseVisualStyleBackColor = true;
            this.Close_Btn.Click += new System.EventHandler(this.Close_Btn_Click);
            // 
            // RePrint_Btn
            // 
            this.RePrint_Btn.Location = new System.Drawing.Point(24, 108);
            this.RePrint_Btn.Margin = new System.Windows.Forms.Padding(4);
            this.RePrint_Btn.Name = "RePrint_Btn";
            this.RePrint_Btn.Size = new System.Drawing.Size(95, 62);
            this.RePrint_Btn.TabIndex = 17;
            this.RePrint_Btn.Text = "RePrint";
            this.RePrint_Btn.UseVisualStyleBackColor = true;
            this.RePrint_Btn.Click += new System.EventHandler(this.RePrint_Btn_Click);
            // 
            // Clear_Btn
            // 
            this.Clear_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Clear_Btn.Location = new System.Drawing.Point(24, 185);
            this.Clear_Btn.Margin = new System.Windows.Forms.Padding(4);
            this.Clear_Btn.Name = "Clear_Btn";
            this.Clear_Btn.Size = new System.Drawing.Size(95, 62);
            this.Clear_Btn.TabIndex = 18;
            this.Clear_Btn.Text = "Clear";
            this.Clear_Btn.UseVisualStyleBackColor = true;
            this.Clear_Btn.Click += new System.EventHandler(this.Clear_Btn_Click);
            // 
            // Print_Btn
            // 
            this.Print_Btn.Location = new System.Drawing.Point(24, 31);
            this.Print_Btn.Margin = new System.Windows.Forms.Padding(4);
            this.Print_Btn.Name = "Print_Btn";
            this.Print_Btn.Size = new System.Drawing.Size(95, 62);
            this.Print_Btn.TabIndex = 16;
            this.Print_Btn.Text = "Save";
            this.Print_Btn.UseVisualStyleBackColor = true;
            this.Print_Btn.Click += new System.EventHandler(this.Print_Btn_Click);
            // 
            // Total_Txt
            // 
            this.Total_Txt.Enabled = false;
            this.Total_Txt.Location = new System.Drawing.Point(494, 338);
            this.Total_Txt.Margin = new System.Windows.Forms.Padding(4);
            this.Total_Txt.Name = "Total_Txt";
            this.Total_Txt.Size = new System.Drawing.Size(174, 28);
            this.Total_Txt.TabIndex = 14;
            this.Total_Txt.Text = "0";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(389, 341);
            this.label8.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(47, 21);
            this.label8.TabIndex = 212;
            this.label8.Text = "Total";
            // 
            // EMonth_Txt
            // 
            this.EMonth_Txt.Enabled = false;
            this.EMonth_Txt.Location = new System.Drawing.Point(451, 148);
            this.EMonth_Txt.Margin = new System.Windows.Forms.Padding(4);
            this.EMonth_Txt.Name = "EMonth_Txt";
            this.EMonth_Txt.Size = new System.Drawing.Size(176, 28);
            this.EMonth_Txt.TabIndex = 240;
            // 
            // Van_Bill_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(954, 652);
            this.Controls.Add(this.groupBox4);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.groupBox1);
            this.Name = "Van_Bill_Frm";
            this.Text = "Van Bill";
            this.Load += new System.EventHandler(this.Van_Bill_Frm_Load);
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.groupBox4.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.Van_Bill_Master_dataGridView1)).EndInit();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox5.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.TextBox Trip_Txt;
        private System.Windows.Forms.ComboBox Month_CBox;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.TextBox Trip_Amt_Txt;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox Place_Txt;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.DateTimePicker VBill_Date_Dtp;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.TextBox Admis_No_Txt;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.TextBox VBill_No_Txt;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.GroupBox groupBox4;
        private System.Windows.Forms.DataGridView Van_Bill_Master_dataGridView1;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.TextBox Total_Txt;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.ComboBox Sec_CBox;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.ComboBox Student_Name_CBox;
        private System.Windows.Forms.Label label14;
        private System.Windows.Forms.TextBox SMonth_Txt;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.GroupBox groupBox5;
        private System.Windows.Forms.Button RePrint_Btn;
        private System.Windows.Forms.Button Clear_Btn;
        private System.Windows.Forms.Button Print_Btn;
        private System.Windows.Forms.Button Close_Btn;
        private System.Windows.Forms.TextBox EMonth_Txt;
    }
}